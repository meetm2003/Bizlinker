import 'package:bizlinker/app_export.dart';

class AuthController extends GetxController {
  final _storage = GetStorage();
  final tokenKey = "auth_token";
  final onboardingKey = "onboarding_shown";

  @override
  void onInit() {
    super.onInit();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      checkAuthentication();
    });
  }

  void saveToken(String token) {
    _storage.write(tokenKey, token);
  }

  bool isOnboardingSeen() => _storage.read(onboardingKey) ?? false;

  void setOnboardingSeen() {
    _storage.write(onboardingKey, true);
  }

  void checkAuthentication() {
    if (!isOnboardingSeen()) {
      Get.offAll(() => OnboardingScreen());
    } else {
      final token = _storage.read(tokenKey);
      if (token != null && token.isNotEmpty) {
        Get.offAll(() => HomeScreen());
      } else {
        Get.offAll(() => LoginScreen());
      }
    }
  }

  void logout() {
    _storage.remove(tokenKey);
    Get.offAll(() => LoginScreen());
  }
}

import 'package:bizlinker/app_export.dart';

class RootScreen extends StatelessWidget {
  const RootScreen({super.key});

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authController = Get.put(AuthController());
      authController.checkAuthentication();
    });

    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}

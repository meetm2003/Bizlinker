import 'package:bizlinker/Services/login_api.dart';
import 'package:bizlinker/app_export.dart';

class LoginController extends GetxController {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final AuthController authController = Get.find();

  void loginUser() async {
    final response = await LoginApiUrls.loginUser(
      emailController.text,
      passwordController.text,
    );

    if (response != null && response.data is Map<String, dynamic>) {
      final token = response.data['token'];
      // print('token: ${token}');

      if (token != null) {
        authController.saveToken(token);
        Get.snackbar('Success', 'Logged in Successfully!');
        Get.offAll(() => HomeScreen());
      } else {
        Get.snackbar("Error", "Invalid credentials. Try again!");
      }
    } else {
      Get.snackbar("Error", "Server error. Please try again later!");
    }
  }
}

class LoginScreen extends StatelessWidget {
  final LoginController controller = Get.put(LoginController());

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121717),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.lock, size: 100, color: Colors.white),
            const SizedBox(height: 20),
            const CustomText(text: "Welcome Back!", fontSize: 24),
            const SizedBox(height: 20),

            // Email Field
            CustomTextField(
              hintText: "Email",
              controller: controller.emailController,
              type: "text",
            ),

            const SizedBox(height: 10),

            // Password Field
            CustomTextField(
              hintText: "Password",
              controller: controller.passwordController,
              type: "password",
            ),

            const SizedBox(height: 20),
            CustomButton(
              text: "Login",
              onPressed: controller.loginUser,
              isFullWidth: true,
            ),

            const SizedBox(height: 10),

            // Navigate to Register
            TextButton(
              onPressed: () => Get.offAll(() => RegisterScreen()),
              child: const Text(
                "Don't have an account? Sign Up",
                style: TextStyle(color: Colors.white70, fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

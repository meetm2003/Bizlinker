import 'package:bizlinker/Custom/custom_selector.dart';
import 'package:bizlinker/Screens/Auth/otp_verification_screen.dart';
import 'package:bizlinker/app_export.dart';

class RegisterController extends GetxController {
  final profilePicController = TextEditingController();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final mobileController = TextEditingController();
  final roleController = TextEditingController();
  final dobController = TextEditingController();
  final skillsController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  void registerUser() async {
    if (passwordController.text != confirmPasswordController.text) {
      Get.snackbar("Error", "Passwords do not match");
      return;
    }

    final response = await ApiUrls.registerUser(
      nameController.text,
      emailController.text,
      mobileController.text,
      roleController.text,
      dobController.text,
      skillsController.text,
      profilePicController.text,
      confirmPasswordController.text,
    );

    if (response != null &&
        response.data['message'] == "Verification email sent") {
      Get.offAll(
        () => OTPVerificationScreen(
          email: emailController.text,
        ),
      );
    } else {
      Get.snackbar("Error", "Registration failed. Try again!");
    }
  }
}

class RegisterScreen extends StatelessWidget {
  final RegisterController controller = Get.put(RegisterController());
  // final AuthController authController = Get.put(AuthController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121717),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 30),
              CustomTextField(
                hintText: "",
                controller: controller.profilePicController,
                type: "profile",
              ),
              const SizedBox(height: 10),
              const CustomText(text: "Create an Account"),
              const SizedBox(height: 20),
              CustomTextField(
                hintText: "Name",
                controller: controller.nameController,
                type: "text",
              ),
              const SizedBox(height: 10),
              CustomTextField(
                hintText: "Email",
                controller: controller.emailController,
                type: "email",
              ),
              const SizedBox(height: 10),
              CustomTextField(
                hintText: "Mobile Number",
                controller: controller.mobileController,
                type: "phone",
              ),
              const SizedBox(height: 10),
              CustomSelector(
                hintText: "Role",
                controller: controller.roleController,
                options: ["business_owner", "user"],
                type: "selector",
              ),
              const SizedBox(height: 10),
              CustomTextField(
                hintText: "Date of Birth",
                controller: controller.dobController,
                type: "date",
              ),
              const SizedBox(height: 10),
              CustomSelector(
                hintText: "Skills",
                controller: controller.skillsController,
                type: "multipleSelector",
                options: ["Hardworking", "Marketing"],
              ),
              const SizedBox(height: 10),
              CustomTextField(
                hintText: "Password",
                controller: controller.passwordController,
                type: "password",
              ),
              const SizedBox(height: 10),
              CustomTextField(
                hintText: "Confirm Password",
                controller: controller.confirmPasswordController,
                type: "password",
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: "Register",
                onPressed: controller.registerUser,
                isFullWidth: true,
              ),
              const SizedBox(height: 10),
              TextButton(
                onPressed: () => Get.offAll(() => LoginScreen()),
                child: const Text(
                  "Already have an account? Login",
                  style: TextStyle(color: Colors.white70, fontSize: 14),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

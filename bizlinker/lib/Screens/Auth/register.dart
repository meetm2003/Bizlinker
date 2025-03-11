import 'package:bizlinker/app_export.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController profilePicController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController roleController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController skillsController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  String? checkPass(BuildContext context, String pass, String confirmPass) {
    if (pass == confirmPass) {
      return confirmPass;
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text("Passwords are not match, please check"),
          duration: Duration(seconds: 1),
        ),
      );
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121717),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          padding: EdgeInsets.all(10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 30),

              CustomTextField(
                hintText: "",
                controller: profilePicController,
                type: "profile",
              ),

              const SizedBox(height: 10),

              CustomText(
                text: "Create an Account",
              ),
              const SizedBox(height: 20),

              // Name Input
              CustomTextField(
                hintText: "Name",
                controller: nameController,
                type: "text",
              ),
              const SizedBox(height: 10),

              // Email Input
              CustomTextField(
                hintText: "Email",
                controller: emailController,
                type: "text",
              ),
              const SizedBox(height: 10),

              // Mobile Number Input
              CustomTextField(
                hintText: "Mobile Number",
                controller: mobileController,
                type: "mobile",
              ),
              const SizedBox(height: 10),

              // Role Input
              CustomTextField(
                hintText: "Role",
                controller: roleController,
                type: "text",
              ),
              const SizedBox(height: 10),

              // Date of Birth Input (Opens Date Picker)
              CustomTextField(
                hintText: "Date of Birth",
                controller: dobController,
                type: "date",
              ),
              const SizedBox(height: 10),

              // Skills Input
              CustomTextField(
                hintText: "Skills",
                controller: skillsController,
                type: "text",
              ),
              const SizedBox(height: 10),

              // Password Input
              CustomTextField(
                hintText: "Password",
                controller: passwordController,
                type: "password",
              ),
              const SizedBox(height: 10),

              // Confirm Password Input
              CustomTextField(
                hintText: "Confirm Password",
                controller: confirmPasswordController,
                type: "password",
              ),
              const SizedBox(height: 20),

              // Register Button
              CustomButton(
                text: "Register",
                onPressed: () async {
                  String? validPassword = checkPass(
                    context,
                    passwordController.text,
                    confirmPasswordController.text,
                  );
                  if (validPassword != null) {
                    final responce = await ApiUrls.registerUser(
                      nameController.text,
                      emailController.text,
                      mobileController.text,
                      roleController.text,
                      dobController.text,
                      skillsController.text,
                      profilePicController.text,
                      confirmPasswordController.text,
                    );
                    print("API SIGN IN -> $responce");
                  }
                },
                isFullWidth: true,
              ),
              const SizedBox(height: 10),

              // Login Navigation
              TextButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => LoginScreen(),
                    ),
                  );
                },
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

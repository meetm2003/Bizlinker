import 'package:bizlinker/app_export.dart';

class OTPController extends GetxController {
  var otpFields = List.generate(6, (index) => TextEditingController()).obs;

  Future<void> verifyOTP(BuildContext context, String email) async {
    String otp = otpFields.map((controller) => controller.text).join();
    if (otp.length != 6) {
      Get.snackbar(
        'Error',
        'Please enter all 6 digits.',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
      return;
    }

    final response = await OtpVerifyApi.verifyUser(email, otp);
    if (response != null &&
        response.data['message'] == "User Verified successfully!!!") {
      Get.snackbar('Success', 'OTP Verified Successfully!');
      Get.offAll(() => LoginScreen());
    } else {
      Get.snackbar("Error", "Registration failed. Try again!");
    }
  }
}

class OTPVerificationScreen extends StatelessWidget {
  final OTPController otpController = Get.put(OTPController());
  final String email;

  OTPVerificationScreen({
    super.key,
    required this.email,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121717),
      appBar: AppBar(
        title: const Text("OTP Verification"),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Enter the 6-digit OTP sent to your email.",
              style: TextStyle(color: Colors.white70),
            ),
            const SizedBox(height: 20),

            // OTP Fields
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (index) {
                return SizedBox(
                  width: 45,
                  height: 50,
                  child: TextField(
                    controller: otpController.otpFields[index],
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    maxLength: 1,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      counterText: "",
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white30),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.blue),
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onChanged: (value) {
                      if (value.isNotEmpty && index < 5) {
                        FocusScope.of(context).nextFocus();
                      }
                      if (value.isEmpty && index > 0) {
                        FocusScope.of(context).previousFocus();
                      }
                    },
                  ),
                );
              }),
            ),

            const SizedBox(height: 20),

            // Verify Button
            ElevatedButton(
              onPressed: () => otpController.verifyOTP(context, email),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                minimumSize: const Size(double.infinity, 50),
                textStyle: TextStyle(color: Colors.white),
              ),
              child: const Text("Verify OTP"),
            ),

            const SizedBox(height: 15),

            // Resend OTP Option
            TextButton(
              onPressed: () {
                Get.snackbar(
                    'OTP Resent', 'A new OTP has been sent to your email.',
                    backgroundColor: Colors.blue, colorText: Colors.white);
              },
              child: const Text(
                "Resend OTP",
                style: TextStyle(color: Colors.blueAccent),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

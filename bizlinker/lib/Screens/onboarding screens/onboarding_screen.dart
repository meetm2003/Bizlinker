import 'package:bizlinker/Controllers/onboarding_controller.dart';
import 'package:bizlinker/app_export.dart';

class OnboardingScreen extends StatelessWidget {
  final OnboardingController controller = Get.put(OnboardingController());
  final AuthController authController = Get.find();

  OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF121717),
      body: SafeArea(
        child: Stack(
          children: [
            PageView(
              controller: controller.pageController,
              onPageChanged: controller.updatePage,
              children: const [
                OnboardingPage(
                  image: Icons.public,
                  title: "Connect Local to Global",
                  description: "Expand your market reach beyond boundaries.",
                ),
                OnboardingPage(
                  image: Icons.business,
                  title: "Industry-Specific Marketplace",
                  description:
                      "Business owners can share RFQs and place bids. Explore product and service listings.",
                ),
                OnboardingPage(
                  image: Icons.share,
                  title: "Referral Sharing",
                  description:
                      "Business owners can refer users to companies or individuals, enabling better connections.",
                ),
              ],
            ),
            Positioned(
              top: 20,
              right: 20,
              child: TextButton(
                onPressed: () {
                  authController.setOnboardingSeen(); // Mark onboarding as seen
                  Get.offAll(() => LoginScreen()); // Navigate to LoginScreen
                },
                child: const Text(
                  "Skip",
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ),
            ),
            Positioned(
              bottom: 20,
              left: 0,
              right: 0,
              child: Center(
                child: Obx(() => controller.currentPage.value == 2
                    ? ElevatedButton(
                        onPressed: () {
                          authController
                              .setOnboardingSeen(); // Mark onboarding as seen
                          Get.offAll(
                              () => LoginScreen()); // Navigate to LoginScreen
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.lightBlue,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 135, vertical: 15),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                        ),
                        child: const Text(
                          "Get Started",
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                      )
                    : SmoothPageIndicator(
                        controller: controller.pageController,
                        count: 3,
                        effect: const WormEffect(
                          activeDotColor: Colors.white,
                          dotColor: Colors.grey,
                          dotHeight: 8,
                          dotWidth: 8,
                        ),
                      )),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

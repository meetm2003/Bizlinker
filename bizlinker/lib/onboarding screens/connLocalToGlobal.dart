import 'package:bizlinker/Auth/login.dart';
import 'package:bizlinker/onboarding%20screens/onboarding.dart';
import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  _OnboardingScreenState createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF121717),
      body: SafeArea(
        child: Stack(
          children: [
            PageView(
              controller: _controller,
              onPageChanged: (index) {
                setState(() {
                  currentPage = index;
                });
              },
              children: const [
                OnboardingPage(
                  image: Icons.public, // Change to a relevant icon or image
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
                  image: Icons.share, // Change to a relevant icon or image
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
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                  );
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
                child: currentPage == 2
                    ? ElevatedButton(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => LoginScreen()),
                          );
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
                        controller: _controller,
                        count: 3, // Updated count to include the new page
                        effect: WormEffect(
                          activeDotColor: Colors.white,
                          dotColor: Colors.grey,
                          dotHeight: 8,
                          dotWidth: 8,
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

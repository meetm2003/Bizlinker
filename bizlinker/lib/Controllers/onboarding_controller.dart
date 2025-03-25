import 'package:bizlinker/app_export.dart';

class OnboardingController extends GetxController {
  final PageController pageController = PageController();
  var currentPage = 0.obs;

  void updatePage(int index) {
    currentPage.value = index;
  }
}

import 'package:dio/dio.dart' as d;

class OtpVerifyApi {
  static const String verifyUrl =
      "https://bizlinker.onrender.com/api/auth/verify";

  static Future<d.Response?> verifyUser(
    String email,
    String verificationCode,
  ) async {
    final json = {
      "email": email,
      "verificationCode": verificationCode,
    };
    final dio = d.Dio();
    print("REQUEST DATA : $json");
    try {
      final response = await dio.postUri(
        Uri.parse(verifyUrl),
        data: json,
        options: d.Options(
          followRedirects: false,
          validateStatus: (status) => true,
        ),
      );
      print("----> $response");

      return response;
    } on d.DioException catch (error) {
      print("CATCH ERROR : ${error.message}");
      return null;
    } catch (error) {
      print(" ERROR : ${error}");
      return null;
    }
  }
}
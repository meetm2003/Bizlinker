import 'package:bizlinker/app_export.dart';
import 'package:dio/dio.dart' as d;

class LoginApiUrls {
  static const String loginUrl =
      "https://bizlinker.onrender.com/api/auth/login";

  static Future<d.Response?> loginUser(
    String email,
    String password,
  ) async {
    final json = {
      "email": email,
      "password": password,
    };
    final dio = d.Dio();
    print("REQUEST DATA : $json");
    try {
      final response = await dio.postUri(
        Uri.parse(loginUrl),
        data: json,
        options: d.Options(
          followRedirects: false,
          validateStatus: (status) => true,
          responseType: d.ResponseType.json,
        ),
      );
      print("----> ${response.data}");
      print("RESPONSE STATUS: ${response.statusCode}");

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

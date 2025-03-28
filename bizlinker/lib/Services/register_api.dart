import 'package:dio/dio.dart' as d;

class ApiUrls {
  static const String registerUrl =
      "https://bizlinker.onrender.com/api/auth/register";

  static Future<d.Response?> registerUser(
    String name,
    String email,
    String mobile,
    String role,
    String dob,
    String skill,
    String profilePic,
    String password,
  ) async {
    final json = {
      "name": name,
      "email": email,
      "phone": mobile,
      "passwordHash": password,
      "role": role,
      "dob": dob,
      "profilePic": profilePic,
      "skills": skill,
    };
    final dio = d.Dio();
    print("REQUEST DATA : $json");
    try {
      final response = await dio.postUri(
        Uri.parse(registerUrl),
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

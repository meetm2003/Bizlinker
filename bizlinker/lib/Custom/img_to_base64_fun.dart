import "dart:io";
import 'package:image_picker/image_picker.dart';  
import "../app_export.dart";

Future<String?> convertImageToBase64(XFile file) async {
  try {
    File imageFile = File(file.path);
    List<int> imageBytes = await imageFile.readAsBytes();
    return base64Encode(imageBytes);
  } catch (e) {
    print("Error encoding image: $e");
    return null;
  }
}
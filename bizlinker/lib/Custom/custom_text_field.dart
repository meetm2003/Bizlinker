import 'dart:typed_data';
import 'package:bizlinker/app_export.dart';
import 'package:dio/dio.dart' as dio;
import 'dart:io';

class CustomTextField extends StatefulWidget {
  final String hintText;
  final TextEditingController controller;
  final String type;

  const CustomTextField({
    super.key,
    required this.hintText,
    required this.controller,
    required this.type,
  });

  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  final ImagePicker _picker = ImagePicker();
  final dio.Dio _dio = dio.Dio();
  XFile? _selectedFile;

  Future<void> pickAndUploadFile() async {
    showLoadingDialog(context);
    try {
      XFile? file;

      if (widget.type == "photo" || widget.type == "profile") {
        file = await _picker.pickImage(source: ImageSource.gallery);
      } else if (widget.type == "video") {
        file = await _picker.pickVideo(source: ImageSource.gallery);
      }

      // print('file upload');

      if (file == null) {
        hideLoadingDialog(context);
        print('No file selected.');
        return;
      }

      // print('file is not null');

      setState(() {
        _selectedFile = file;
      });

      // print('Selected File Path: ${file.path}');

      final fileInfo = await File(file.path).stat();
      if (fileInfo.size == 0) {
        hideLoadingDialog(context);
        print('Error: File is empty.');
        return;
      }

      Uint8List fileBytes = await File(file.path).readAsBytes();

      dio.FormData formData = dio.FormData.fromMap({
        'file': dio.MultipartFile.fromBytes(
          fileBytes,
          filename: file.name,
        ),
      });

      final response = await _dio.post(
        'https://bizlinker.onrender.com/api/upload',
        data: formData,
        options: dio.Options(
          followRedirects: false,
          validateStatus: (status) => true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        ),
      );

      // print('response came');

      if (response.statusCode == 200 && response.data['url'] != null) {
        final uploadedUrl = response.data['url'];
        widget.controller.text = uploadedUrl;
        print('Uploaded File URL: $uploadedUrl');
      } else {
        print('Upload failed with status: ${response.statusCode}');
        print('Response Data: ${response.data}');
      }
    } catch (e) {
      print('Error uploading file: $e');
    } finally {
      hideLoadingDialog(context);
    }
  }

  Future<void> _selectDate() async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (pickedDate != null) {
      setState(() {
        widget.controller.text = "${pickedDate.toLocal()}".split(' ')[0];
      });
    }
  }

  String? _validateInput(String? value) {
    if (widget.type == "email" &&
        !RegExp(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            .hasMatch(value ?? "")) {
      return "Enter a valid email address";
    }

    if (widget.type == "phone" &&
        !RegExp(r"^\+\d{1,3}\s?\d{10}$").hasMatch(value ?? "")) {
      return "Enter a valid phone number with country code (e.g. +91 1234567890)";
    }

    if (widget.type == "password" &&
        !RegExp(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\$!%*?&])[A-Za-z\d@\$!%*?&]{8,}\$')
            .hasMatch(value ?? "")) {
      return "Password must contain uppercase, lowercase, number, and special character.";
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.type == "profile") {
      return Center(
        child: GestureDetector(
          onTap: pickAndUploadFile,
          child: Stack(
            alignment: Alignment.center,
            children: [
              CircleAvatar(
                radius: 50,
                backgroundColor: Colors.white24,
                backgroundImage: _selectedFile != null
                    ? FileImage(File(_selectedFile!.path))
                    : null,
                child: _selectedFile == null
                    ? const Icon(Icons.camera_alt,
                        color: Colors.white, size: 30)
                    : null,
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: CircleAvatar(
                  radius: 18,
                  backgroundColor: Colors.lightBlue,
                  child: const Icon(Icons.edit, color: Colors.white, size: 18),
                ),
              ),
            ],
          ),
        ),
      );
    }

    if (widget.type == "date") {
      return GestureDetector(
        onTap: widget.type == "date" ? _selectDate : null,
        child: AbsorbPointer(
          absorbing: widget.type == "date",
          child: TextField(
            controller: widget.controller,
            style: const TextStyle(color: Colors.white),
            decoration: InputDecoration(
              counterText: '',
              hintText: widget.hintText,
              hintStyle: const TextStyle(color: Colors.white70),
              filled: true,
              fillColor: const Color.fromARGB(255, 37, 44, 50),
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 17, horizontal: 20),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
      );
    }
    if (widget.type == "email" ||
        widget.type == "password" ||
        widget.type == "mobile") {
      return TextFormField(
        controller: widget.controller,
        keyboardType: _getKeyboardType(widget.type),
        obscureText: widget.type == "password",
        maxLength: widget.type == "mobile" ? 10 : null,
        style: const TextStyle(color: Colors.white),
        validator: _validateInput,
        decoration: InputDecoration(
          counterText: '',
          hintText: widget.hintText,
          hintStyle: const TextStyle(color: Colors.white70),
          filled: true,
          fillColor: const Color.fromARGB(255, 37, 44, 50),
          contentPadding:
              const EdgeInsets.symmetric(vertical: 17, horizontal: 20),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide.none,
          ),
        ),
      );
    }

    return TextField(
      controller: widget.controller,
      keyboardType: _getKeyboardType(widget.type),
      obscureText: widget.type == "password",
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        hintText: widget.hintText,
        hintStyle: const TextStyle(color: Colors.white70),
        filled: true,
        fillColor: const Color.fromARGB(255, 37, 44, 50),
        contentPadding:
            const EdgeInsets.symmetric(vertical: 17, horizontal: 20),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }

  TextInputType _getKeyboardType(String type) {
    switch (type) {
      case "mobile":
      case "phone":
        return TextInputType.phone;
      case "number":
        return TextInputType.number;
      case "email":
        return TextInputType.emailAddress;
      case "date":
        return TextInputType.datetime;
      default:
        return TextInputType.text;
    }
  }
}

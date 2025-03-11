import 'package:bizlinker/app_export.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class CustomTextField extends StatefulWidget {
  final String hintText;
  final TextEditingController controller;
  final String type; // text, mobile, number, date, password, photo, video

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
  XFile? _selectedFile;

  // Pick a file for photo/video
  Future<void> _pickFile() async {
    XFile? file;
    if (widget.type == "photo" || widget.type == "profile") {
      file = await _picker.pickImage(source: ImageSource.gallery);
    } else if (widget.type == "video") {
      file = await _picker.pickVideo(source: ImageSource.gallery);
    }

    if (file != null) {
      String? base64Image = await convertImageToBase64(file);
      setState(() {
        if (base64Image != null) {
          widget.controller.text = base64Image;
        }
      });
    }
  }

  // Date Picker Function
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

  @override
  Widget build(BuildContext context) {
    if (widget.type == "profile") {
      return Center(
        child: GestureDetector(
          onTap: _pickFile,
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
    if (widget.type == "photo" || widget.type == "video") {
      return GestureDetector(
        onTap: _pickFile,
        child: Container(
          height: 60,
          decoration: BoxDecoration(
            color: const Color.fromARGB(255, 37, 44, 50),
            borderRadius: BorderRadius.circular(15),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                widget.type == "photo" ? Icons.image : Icons.videocam,
                color: Colors.white,
              ),
              const SizedBox(width: 10),
              Text(
                _selectedFile == null
                    ? "Select ${widget.type == "photo" ? "Photo" : "Video"}"
                    : "File Selected",
                style: const TextStyle(color: Colors.white),
              ),
            ],
          ),
        ),
      );
    }

    return GestureDetector(
      onTap: widget.type == "date" ? _selectDate : null,
      child: AbsorbPointer(
        absorbing: widget.type == "date",
        child: TextField(
          controller: widget.controller,
          keyboardType: _getKeyboardType(widget.type),
          obscureText: widget.type == "password",
          maxLength: widget.type == "mobile" ? 10 : null,
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
            suffixIcon: widget.type == "date"
                ? const Icon(Icons.calendar_today, color: Colors.white70)
                : null,
          ),
        ),
      ),
    );
  }

  TextInputType _getKeyboardType(String type) {
    switch (type) {
      case "mobile":
        return TextInputType.phone;
      case "number":
        return TextInputType.number;
      case "date":
        return TextInputType.datetime;
      default:
        return TextInputType.text;
    }
  }
}

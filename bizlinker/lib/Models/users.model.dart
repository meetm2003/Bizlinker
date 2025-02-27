import 'package:bizlinker/app_export.dart';

Users usersFromJson(String str) => Users.fromJson(json.decode(str));

String usersToJson(Users data) => json.encode(data.toJson());

class Users {
    UsersClass users;

    Users({
        required this.users,
    });

    factory Users.fromJson(Map<String, dynamic> json) => Users(
        users: UsersClass.fromJson(json["users"]),
    );

    Map<String, dynamic> toJson() => {
        "users": users.toJson(),
    };
}

class UsersClass {
    String name;
    String email;
    String phone;
    String passwordHash;
    String role;
    DateTime dob;
    String profilePic;
    String skills;

    UsersClass({
        required this.name,
        required this.email,
        required this.phone,
        required this.passwordHash,
        required this.role,
        required this.dob,
        required this.profilePic,
        required this.skills,
    });

    factory UsersClass.fromJson(Map<String, dynamic> json) => UsersClass(
        name: json["name"],
        email: json["email"],
        phone: json["phone"],
        passwordHash: json["passwordHash"],
        role: json["role"],
        dob: DateTime.parse(json["dob"]),
        profilePic: json["profilePic"],
        skills: json["skills"],
    );

    Map<String, dynamic> toJson() => {
        "name": name,
        "email": email,
        "phone": phone,
        "passwordHash": passwordHash,
        "role": role,
        "dob": "${dob.year.toString().padLeft(4, '0')}-${dob.month.toString().padLeft(2, '0')}-${dob.day.toString().padLeft(2, '0')}",
        "profilePic": profilePic,
        "skills": skills,
    };
}
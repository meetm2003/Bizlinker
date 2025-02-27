import 'package:bizlinker/Industry%20specific%20marketplace/indus_marketplace.dart';
import 'package:bizlinker/Profile/profile.dart';
import 'package:bizlinker/Referral/referral.dart';
import 'package:bizlinker/create%20post/createPost.dart';
import 'package:bizlinker/home/feed.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  final List<Widget> _pages = [
    FeedScreen(),
    IndustryMarketplaceScreen(),
    CreatePostScreen(),
    ReferralScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF121717),
      appBar: AppBar(
        backgroundColor: Color(0xFF121717),
        title: const Text("Bizlinker", style: TextStyle(color: Colors.white)),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Icon(Icons.message, color: Colors.white),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(60),
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: TextField(
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: "Search",
                hintStyle: TextStyle(color: Colors.white70),
                filled: true,
                fillColor: Color.fromARGB(255, 37, 44, 50),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: BorderSide.none,
                ),
                prefixIcon: Icon(Icons.search, color: Colors.white70),
              ),
            ),
          ),
        ),
      ),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Color.fromARGB(255, 37, 44, 50),
        selectedItemColor: Colors.lightBlue,
        unselectedItemColor: Colors.white70,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.business), label: "Marketplace"),
          BottomNavigationBarItem(icon: Icon(Icons.add_circle), label: "Post"),
          BottomNavigationBarItem(icon: Icon(Icons.share), label: "Referral"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}
// library_private_types_in_public_api
// ignore_for_file: unused_field, library_private_types_in_public_api

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../UI/POWER.dart';

class Sun extends StatefulWidget {
  final String? userId; // Add userId parameter

  const Sun({super.key, this.userId, required bool showTutorial});

  @override
  _SunState createState() => _SunState();
}

class _SunState extends State<Sun> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    const Power(),
    // const Soul(),
    // const Space(),
    // const Time()
  ];

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SunPageContent(),
    );
  }
}

class SunPageContent extends StatefulWidget {
  const SunPageContent({super.key});

  @override
  _SunPageContentState createState() => _SunPageContentState();
}

class _SunPageContentState extends State<SunPageContent> {
  bool _isSignedIn = false;

  @override
  void initState() {
    super.initState();
    _checkSignInStatus();
  }

// Managing users
  Future<void> _checkSignInStatus() async {
    var user = FirebaseAuth.instance.currentUser;
    setState(() {
      _isSignedIn = user != null;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isSignedIn) {
      return PageView(
        children: const [
          Power(), // Keep Lavender AI here
          // Space(), // Keep SettingsPage if needed
        ],
      );
    } else {
      // Return a widget indicating the user is not signed in
      return const Placeholder(); // Replace with your desired widget
    }
  }
}

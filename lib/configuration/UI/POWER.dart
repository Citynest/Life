// ignore_for_file: library_private_types_in_public_api, unused_field, file_names, unused_element

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ice/configuration/UI/about_page.dart';
import 'package:ice/configuration/UI/space.dart';
import 'package:ice/configuration/settings/CoreNav.dart';
import 'package:ice/configuration/settings/disndat.dart';
import 'package:ice/configuration/UI/media_page.dart';
import 'package:ice/configuration/UI/settings.dart';

class Power extends StatefulWidget {
  const Power({super.key});

  @override
  _PowerState createState() => _PowerState();
}

// Handle other pages here
class _PowerState extends State<Power> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    const MediaPage(),
    //const AboutPage(),
    //const SettingsPage(),
  ];

  void _onPageChanged(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Godly\'s Touch'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        titleTextStyle: GoogleFonts.pacifico(
          textStyle: const TextStyle(
              color: Colors.white, fontSize: 20, fontStyle: FontStyle.italic),
        ),
      ),
      drawer: CoreNav(
        navigateToPage: (index) {
          setState(() {
            _selectedIndex = index;
          });
          Navigator.of(context).pop();
        },
        userId: '',
      ),
      body: const PowerPageContent(),
    );
  }
}

class PowerPageContent extends StatefulWidget {
  const PowerPageContent({super.key});

  @override
  _PowerPageContentState createState() => _PowerPageContentState();
}

class _PowerPageContentState extends State<PowerPageContent> {
  bool _isSignedIn = false;

  @override
  void initState() {
    super.initState();
    _checkSignInStatus();
  }

  Future<void> _checkSignInStatus() async {
    var user = FirebaseAuth.instance.currentUser;
    setState(() {
      _isSignedIn = user != null;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isSignedIn) {
      // User is signed in
      return PageView(
        children: const [
          space(),
          MediaPage(),
          //AboutPage(),
          //SettingsPage(),
        ],
      );
    } else {
      // User is not signed in, show login/register logic from disndat.dart
      return const disndat(); // Replace with actual Widget to show if not signed in
    }
  }
}

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:ice/configuration/UI/MIND.dart';
import 'package:ice/configuration/UI/about_page.dart';
import 'package:ice/configuration/UI/settings.dart';
import 'package:ice/configuration/settings/CloudSync.dart';

class CoreNav extends StatelessWidget {
  final Function(int) navigateToPage;
  final String userId;

  // Assuming userId is a String
  CoreNav({super.key, required this.navigateToPage, required this.userId});

  final bool isUserSignedIn = FirebaseAuth.instance.currentUser != null;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Colors.purple,
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Column(
          children: [
            if (isUserSignedIn) ...[
              ListTile(
                leading: const Icon(Icons.account_circle_outlined,
                    color: Colors.white),
                title: FutureBuilder<DocumentSnapshot?>(
                  future: getUserData(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Text('Loading...',
                          style: TextStyle(color: Colors.white));
                    } else if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}',
                          style: const TextStyle(color: Colors.white));
                    } else {
                      var userName = snapshot.data?['username'];
                      if (userName != null && userName.isNotEmpty) {
                        return Text('$userName',
                            style: const TextStyle(color: Colors.white));
                      } else {
                        return const Text('Guest',
                            style: TextStyle(color: Colors.white));
                      }
                    }
                  },
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const mind(),
                    ),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.home_outlined, color: Colors.white),
                title:
                    const Text('Home', style: TextStyle(color: Colors.white)),
                onTap: () => navigateToPage(1),
              ),
              ListTile(
                leading:
                    const Icon(Icons.settings_outlined, color: Colors.white),
                title: const Text('Settings',
                    style: TextStyle(color: Colors.white)),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const SettingsPage(),
                    ),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.help_outline, color: Colors.white),
                title:
                    const Text('Help', style: TextStyle(color: Colors.white)),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const AboutPage(),
                    ),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.logout, color: Colors.white),
                title:
                    const Text('Logout', style: TextStyle(color: Colors.white)),
                onTap: () => CloudSync.signOut(context),
              ),
            ],
            Expanded(child: Container()), // ... other widgets
          ],
        ),
      ),
    );
  }

  Future<DocumentSnapshot?> getUserData() async {
    // Get the current user's ID
    String? uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid != null) {
      // Fetch user data from Firestore using the user's ID
      DocumentSnapshot snapshot =
          await FirebaseFirestore.instance.collection('Users').doc(uid).get();
      return snapshot;
    } else {
      // Return null if the user is not signed in
      return null;
    }
  }
}

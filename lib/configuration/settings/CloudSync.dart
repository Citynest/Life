// ignore_for_file: use_build_context_synchronously, unused_local_variable

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../UI/POWER.dart';
import '../UI/main_screen.dart';
import 'persona.dart';
import 'sun.dart';

class CloudSync {
  static final FirebaseAuth _auth = FirebaseAuth.instance;
  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static void authenticationState(BuildContext context) {
    FirebaseAuth.instance.authStateChanges().listen((User? user) {
      if (user == null) {
        //print('User is currently signed out!');
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const GodlyTouch()),
        );
      } else {
        //print('User is signed in!');
        Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const Power()));
      }
    });
  }

  static Future<void> signOut(BuildContext context) async {
    try {
      await _auth.signOut();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('User signed out successfully'),
          duration: Duration(seconds: 5),
        ),
      );
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const GodlyTouch()),
      );
    } catch (e) {
      //print('Error signing out: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred while signing out'),
          duration: Duration(seconds: 5),
        ),
      );
    }
  }

  static String _getFriendlyErrorMessage(FirebaseAuthException e) {
    if (e.code == 'weak-password') {
      return 'Use a stronger password.';
    } else if (e.code == 'email-already-in-use') {
      return 'I know this email, try login instead.';
    } else if (e.code == 'user-not-found') {
      return 'I don\'t know that email, Register instead.';
    } else if (e.code == 'wrong-password') {
      return 'Password incorrect, try a different one.';
    } else {
      return 'Check your login information or internet & try again.';
    }
  }

  static Future<void> registerUserBasic(
      BuildContext context, String email, String password) async {
    try {
      UserCredential userCredential = await _auth
          .createUserWithEmailAndPassword(email: email, password: password);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('User registration successful'),
            duration: Duration(seconds: 7)),
      );
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const persona()),
      );
    } catch (e) {
      if (e is FirebaseAuthException) {
        final friendlyMessage = _getFriendlyErrorMessage(e);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text(friendlyMessage),
              duration: const Duration(seconds: 6)),
        );
      }
    }
  }

  static void registerUserDetails(
      BuildContext context,
      String userId,
      String username,
      String name,
      String surname,
      int idNumber,
      String homeAddress,
      int phone,
      String riseOfEclipse,
      String locality,
      String gender,
      String birthDate) {
    try {
      // Reference to the user's document in the "users" collection
      DocumentReference userRef = _firestore.collection('Users').doc(userId);

      // Set user details
      userRef.set({
        'username': username,
        'name': name,
        'surname': surname,
        'idNumber': idNumber,
        'homeAddress': homeAddress,
        'phone': phone,
        'locality': locality,
        'gender': gender,
        'birthDate': birthDate,
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('User registration successful'),
          duration: Duration(seconds: 5),
        ),
      );

      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
            builder: (context) => Sun(
                  showTutorial: userId.isNotEmpty,
                )), // Pass the userId to the Power screen
      );
    } catch (e) {
      //print('Error registering user details: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred while registering user details'),
          duration: Duration(seconds: 3),
        ),
      );
    }
  }

  static Future<void> signInUser(
      BuildContext context, String email, String password) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
      // Retrieve the current user's ID
      String userId = _auth.currentUser!.uid;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('sign-in successful'),
            duration: Duration(seconds: 5)),
      );
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const Power()));
    } catch (e) {
      if (e is FirebaseAuthException) {
        final friendlyMessage = _getFriendlyErrorMessage(e);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text(friendlyMessage),
              duration: const Duration(seconds: 5)),
        );
      }
    }
  }

  // Recovery logic redirects to Sun if suceesful
  static Future<void> callAvatar(BuildContext context, String userId,
      String username, int phone, int iD, String email) async {
    try {
      QuerySnapshot snapshot = await _firestore
          .collection('Users')
          .where('username', isEqualTo: username)
          .where('phone', isEqualTo: phone)
          .where('iD', isEqualTo: iD)
          .where('email', isEqualTo: email)
          .get();

      if (snapshot.docs.isNotEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('User details matched successfully'),
            duration: Duration(seconds: 5),
          ),
        );
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
              builder: (context) => Sun(
                    userId: userId,
                    showTutorial: true,
                  )),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('No matching user details found'),
            duration: Duration(seconds: 5),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred while recovering details'),
          duration: Duration(seconds: 5),
        ),
      );
    }
  }
}

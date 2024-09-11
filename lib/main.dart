import 'package:flutter/material.dart';
import 'configuration/UI/main_screen.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ice',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        scaffoldBackgroundColor:
            Colors.black, // Set scaffold background to black
        canvasColor: Colors.black, // Set canvas color to black
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const GodlyTouch(),
    );
  }
}

// settings.dart
import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const Icon(Icons.info, color: Colors.white),
        backgroundColor: Colors.black,
        title: const Text(
          'About Ice Platform',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(16),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Empowering users like this and that, games and stuff... check it out.',
              style: TextStyle(color: Colors.white),
            ),
            // Add more widgets as needed
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

class TutorialOverlay extends StatelessWidget {
  final VoidCallback onGotItPressed;

  const TutorialOverlay({required this.onGotItPressed});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Welcome'),
      content: const Text(
        'I (the CEO) welcome you to Eclipse. 1st let us double check a few things before you get started. Click on your Avatar name in the side navigation bar.',
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
            onGotItPressed(); // Call the callback function
          },
          child: const Text('Got it!'),
        ),
      ],
    );
  }
}

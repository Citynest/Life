// search_modal.dart
import 'package:flutter/material.dart';

class SearchModal extends StatelessWidget {
  const SearchModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Add your animated GIF here
          Image.asset(
            'assets/animations/search_animation.gif',
            width: 150, // Adjust width as needed
            height: 150, // Adjust height as needed
          ),
          const SizedBox(height: 16),
          // Add other search-related widgets here
          const Text('Search Bar'),
          // ... (other search-related widgets)
        ],
      ),
    );
  }
}

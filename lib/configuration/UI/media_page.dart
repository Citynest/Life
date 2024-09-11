// media_page.dart
// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';

class MediaPage extends StatefulWidget {
  const MediaPage({super.key});

  @override
  _MediaPageState createState() => _MediaPageState();
}

class _MediaPageState extends State<MediaPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black, // Background color
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Media player buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildMediaButton(Icons.play_arrow),
              _buildMediaButton(Icons.pause),
              _buildMediaButton(Icons.stop),
              _buildMediaButton(Icons.repeat),
              _buildMediaButton(Icons.shuffle),
              // Add more buttons as needed
            ],
          ),
          // Recommended list
          Container(
            margin: const EdgeInsets.only(top: 16),
            // You can replace this with your recommended list widget
            child: const Text(
              'Subscribe to connect Spotify (P20/2wks)',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMediaButton(IconData icon) {
    return Container(
      margin: const EdgeInsets.all(8),
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.black,
      ),
      child: Icon(icon, color: Colors.white),
    );
  }
}

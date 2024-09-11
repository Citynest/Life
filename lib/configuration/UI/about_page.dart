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
          'About SkyConnect',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(16),
        color: Colors.black, // Background color for better visibility
        child: const SingleChildScrollView(
          // In case the text gets long
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'SkyConnect: Shared Starlink Connectivity for a Seamless Experience',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 16), // Add space between the header and text
              Text(
                'SkyConnect offers users the ability to leverage the power of Starlink’s satellite internet by providing a shared connection platform. This service is designed to bring high-speed, low-latency internet to areas with limited connectivity options, ensuring all users can benefit without the high costs of individual installations.',
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(height: 16),
              Text(
                'How It Works:',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 8),
              Text(
                '• Shared Access: Users can tap into the Starlink service through a communal setup, reducing the upfront cost of installation. SkyConnect pools together resources to make connectivity more affordable and accessible.',
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(height: 8),
              Text(
                '• Seamless Integration: Our platform seamlessly integrates Starlink with the app, allowing users to enjoy uninterrupted internet for browsing, gaming, business, and more.',
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(height: 8),
              Text(
                '• Fair Usage: The app monitors data usage to ensure fair distribution among connected users, optimizing speed and performance for everyone.',
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(height: 8),
              Text(
                '• Affordable Packages: Various tiers are available based on the level of access and data needs, ensuring that everyone, from casual users to heavy streamers, has a suitable plan.',
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(height: 16),
              Text(
                'Why Choose SkyConnect?',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'By using our shared Starlink solution, you get the benefits of cutting-edge satellite internet at a fraction of the cost, with no need for personal hardware. Whether you need fast internet for work or entertainment, SkyConnect provides reliable, cost-effective connectivity, wherever you are.',
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

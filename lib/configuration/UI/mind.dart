import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import 'services.dart';

class mind extends StatelessWidget {
  const mind({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Account Information'),
        backgroundColor: Colors.black,
        iconTheme:
            const IconThemeData(color: Colors.white), // Set back button color
        titleTextStyle: const TextStyle(color: Colors.white, fontSize: 20),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: StreamBuilder<DocumentSnapshot>(
          stream: FirebaseFirestore.instance
              .collection('Users')
              .doc(FirebaseAuth.instance.currentUser?.uid) // Fetch UID here
              .snapshots(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            }
            if (!snapshot.hasData || snapshot.data!.data() == null) {
              return const Center(
                child: Text(
                  'No user data found',
                  style: TextStyle(color: Colors.white),
                ),
              );
            }
            final userData = snapshot.data!.data() as Map<String, dynamic>;

            return Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 20), // Adjust spacing as needed
                CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.grey.shade300,
                  child: const Icon(
                    Icons.person,
                    size: 50,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 20), // Adjust spacing as needed
                _buildTextRow('Username', userData['username']),
                _buildTextRow('Name', userData['name']),
                _buildTextRow('Surname', userData['surname']),
                _buildTextRow('Age', userData['age']),
                _buildTextRow('Gender', userData['gender']),
                _buildTextRow('ID Number', userData['idNumber']?.toString()),
                _buildTextRow('Phone Number', userData['phoneNumber']),
                _buildTextRow('Home Address/ Plot No', userData['homeAddress']),
                // buildTextRown('', userData['']), Extra
                const SizedBox(height: 20), // Adjust spacing as needed
                _buildButtonRow(context,
                    userData), // Pass context to _buildButtonRow and userData for services count
              ],
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Handle edit button press
        },
        child: const Icon(Icons.edit),
      ),
    );
  }

  Widget _buildTextRow(String label, String? value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$label: ${value ?? 'N/A'}',
          style: const TextStyle(
            color: Colors.lightBlue,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        Container(
          margin: const EdgeInsets.symmetric(vertical: 4),
          height: 1,
          color: Colors.purpleAccent, // Thin purple line
        ),
      ],
    );
  }

  Widget _buildButtonRow(BuildContext context, Map<String, dynamic> userData) {
    final int servicesCount = userData['connectedServicesCount'] ?? 0;

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: () {
            // Navigate to Connected Services page
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const ConnectedServicesPage(),
              ),
            );
          },
          child: Text('Connected Services ($servicesCount)'),
        ),
      ],
    );
  }
}

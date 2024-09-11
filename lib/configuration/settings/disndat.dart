// ignore: file_names
// ignore_for_file: library_private_types_in_public_api, camel_case_types
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import '../../firebase_options.dart';
import 'CloudSync.dart';

class disndat extends StatefulWidget {
  const disndat({super.key});

  @override
  _disndatState createState() => _disndatState();
}

class _disndatState extends State<disndat> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool isRegisterMode = false;

  //initializes firebase
  // ignore: non_constant_identifier_names
  void Firedisndat() async {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }

  // Function to handle refresh action
  Future<void> _handleRefresh() async {
    // Clear text in text controllers
    _emailController.clear();
    _passwordController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      child: Scaffold(
        body: Center(
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Icy Deals',
                  style: TextStyle(
                    color: Colors.white, // Set text color to white
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                        'Your trusted platform of premuim goods & services. Find excluse local deals, secure transactions, and enjoy top-notch quality lifestyle. Experience the diamond difference!',
                        style: TextStyle(color: Colors.white)),
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    Firedisndat();
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          backgroundColor: const Color.fromARGB(73, 56, 12, 75),
                          elevation: 0,
                          content: SingleChildScrollView(
                            child: StatefulBuilder(
                              builder:
                                  (BuildContext context, StateSetter setState) {
                                return Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  child: Stack(
                                    children: [
                                      // Your background GIF
                                      Positioned.fill(
                                        child: Image.asset(
                                          'lib/configuration/assets/animations/purpleFlame.gif',
                                          fit: BoxFit.cover,
                                        ),
                                      ),
                                      Column(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          const SizedBox(height: 16),
                                          GestureDetector(
                                            onVerticalDragDown:
                                                (_) {}, // Prevent dragging on header
                                            child: Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: [
                                                IconButton(
                                                  onPressed: () {
                                                    Navigator.pop(context);
                                                  },
                                                  icon: const Icon(
                                                      Icons.drag_handle,
                                                      color: Colors.white),
                                                ),
                                                Text(
                                                  isRegisterMode
                                                      ? 'Register'
                                                      : 'Login',
                                                  style: const TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 20,
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                                IconButton(
                                                  onPressed: () {},
                                                  icon: const Icon(
                                                      Icons.drag_handle,
                                                      color:
                                                          Colors.transparent),
                                                ),
                                              ],
                                            ),
                                          ),
                                          const SizedBox(height: 16),
                                          TextFormField(
                                            controller: _emailController,
                                            decoration: const InputDecoration(
                                              labelText: 'Email',
                                              labelStyle: TextStyle(
                                                  color: Colors.white),
                                              border: OutlineInputBorder(),
                                            ),
                                            style: const TextStyle(
                                                color: Colors.white),
                                          ),
                                          const SizedBox(height: 16),
                                          TextFormField(
                                            controller: _passwordController,
                                            obscureText: true,
                                            decoration: const InputDecoration(
                                              labelText: 'Password',
                                              labelStyle: TextStyle(
                                                  color: Colors.white),
                                              border: OutlineInputBorder(),
                                            ),
                                            style: const TextStyle(
                                                color: Colors.white),
                                          ),
                                          const SizedBox(height: 16),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              Text(
                                                'Login',
                                                style: TextStyle(
                                                  color: isRegisterMode
                                                      ? Colors.grey
                                                      : Colors.white,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              Switch(
                                                value: isRegisterMode,
                                                onChanged: (value) {
                                                  setState(() {
                                                    isRegisterMode = value;
                                                  });
                                                },
                                                activeColor: Colors.purple,
                                                inactiveThumbColor: Colors.grey,
                                              ),
                                              Text(
                                                'Register',
                                                style: TextStyle(
                                                  color: !isRegisterMode
                                                      ? Colors.grey
                                                      : Colors.white,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 16),
                                          ElevatedButton(
                                            onPressed: () {
                                              if (isRegisterMode) {
                                                String email = _emailController
                                                    .text
                                                    .trim();
                                                String password =
                                                    _passwordController.text
                                                        .trim();
                                                CloudSync.registerUserBasic(
                                                    context, email, password);
                                              } else {
                                                String email = _emailController
                                                    .text
                                                    .trim();
                                                String password =
                                                    _passwordController.text
                                                        .trim();
                                                CloudSync.signInUser(
                                                    context, email, password);
                                              }
                                            },
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor: Colors.purple,
                                            ),
                                            child: Text(
                                              isRegisterMode
                                                  ? 'Proceed'
                                                  : 'Enter',
                                              style: const TextStyle(
                                                  color: Colors.white),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                          ),
                        );
                      },
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.purple, // Define button color
                  ),
                  child: const Text(
                    'Start',
                    style: TextStyle(
                        color: Colors.white), // Set text color to white
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

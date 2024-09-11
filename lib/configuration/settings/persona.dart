import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'CloudSync.dart';

class persona extends StatefulWidget {
  const persona({super.key});

  @override
  _personaState createState() => _personaState();
}

class _personaState extends State<persona> {
  DateTime? _selectedDate;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final List<TextEditingController> _controllers = [
    TextEditingController(), // Username
    TextEditingController(), // Name
    TextEditingController(), // Surname
    TextEditingController(), // ID Number
    TextEditingController(), // Home Address
    TextEditingController(), // Phone Number
    TextEditingController(), // How did you know about Eclipse?
  ];
  final List<String> _labels = [
    'Username',
    'Name',
    'Surname',
    'ID Number',
    'Home Address',
    'Phone Number',
    'Referral',
  ];
  int _currentIndex = 0;
  bool _isMale = false;
  bool _isLocal = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Eclipse personament',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        inputDecorationTheme: InputDecorationTheme(
          enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.blue),
            borderRadius: BorderRadius.circular(10.0),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.blue),
            borderRadius: BorderRadius.circular(10.0),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.red),
            borderRadius: BorderRadius.circular(10.0),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.red),
            borderRadius: BorderRadius.circular(10.0),
          ),
          fillColor: Colors.white,
          filled: true,
          labelStyle: const TextStyle(color: Colors.blue),
        ),
      ),
      home: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          backgroundColor: Colors.black,
          title: Text(
            'Registration Phase ${_currentIndex + 1}/${_labels.length + 3}',
            style: const TextStyle(color: Colors.white),
          ),
        ),
        body: Stack(
          children: [
            // Add your GIF animation here
            Image.asset(
              'lib/configuration/assets/animations/powerStone.gif',
              fit: BoxFit.cover,
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (_currentIndex < _labels.length)
                        _buildTextField(
                          controller: _controllers[_currentIndex],
                          label: _labels[_currentIndex],
                        )
                      else
                        _buildSpecialField(_currentIndex - _labels.length),
                      const SizedBox(height: 40),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          if (_currentIndex > 0)
                            ElevatedButton(
                              onPressed: _previousField,
                              child: const Text('Previous'),
                            ),
                          const SizedBox(width: 20),
                          ElevatedButton(
                            onPressed: _nextField,
                            child: Text(_currentIndex == _labels.length + 2
                                ? 'Submit'
                                : 'Next'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextFormField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
        ),
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your $label';
          }
          if ((label == 'ID Number' || label == 'Phone Number') &&
              int.tryParse(value) == null) {
            return 'Please enter a valid number for $label';
          }
          return null;
        },
      ),
    );
  }

  Widget _buildSpecialField(int index) {
    switch (index) {
      case 0:
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Gender:'),
            Radio<bool>(
              value: true,
              groupValue: _isMale,
              onChanged: (value) {
                setState(() {
                  _isMale = value!;
                });
              },
            ),
            const Text('Male'),
            Radio<bool>(
              value: false,
              groupValue: _isMale,
              onChanged: (value) {
                setState(() {
                  _isMale = value!;
                });
              },
            ),
            const Text('Female'),
          ],
        );
      case 1:
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Locality:'),
            Radio<bool>(
              value: true,
              groupValue: _isLocal,
              onChanged: (value) {
                setState(() {
                  _isLocal = value!;
                });
              },
            ),
            const Text('Local'),
            Radio<bool>(
              value: false,
              groupValue: _isLocal,
              onChanged: (value) {
                setState(() {
                  _isLocal = value!;
                });
              },
            ),
            const Text('Foreigner'),
          ],
        );
      case 2:
        return Column(
          children: [
            const Text('Birthdate:'),
            ElevatedButton(
              onPressed: _selectDate,
              child: Text(
                _selectedDate == null
                    ? 'Select Date'
                    : '${_selectedDate!.year}-${_selectedDate!.month}-${_selectedDate!.day}',
              ),
            ),
          ],
        );
      default:
        return Container();
    }
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  void _nextField() {
    if (_formKey.currentState!.validate()) {
      if (_currentIndex < _labels.length + 2) {
        setState(() {
          _currentIndex++;
        });
      } else {
        _submitForm();
      }
    }
  }

  void _previousField() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
      });
    }
  }

  void _submitForm() {
    if (_selectedDate != null) {
      final age = DateTime.now().year - _selectedDate!.year;
      if (age < 17) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Text('You must be at least 17+ years old to register')),
        );
        return;
      }
    }

    String username = _controllers[0].text; // Username
    String name = _controllers[1].text; // Real name
    String surname = _controllers[2].text; // Surname
    int idNumber = int.parse(_controllers[3].text); // ID number
    String homeAddress = _controllers[4].text; // Home address
    int phone = int.parse(_controllers[5].text); // Phone number
    String Referral = _controllers[6].text; // How'd you know about Eclipse?
    String gender = _isMale ? 'Male' : 'Female'; // Gender
    String locality = _isLocal ? 'Local' : 'Foreigner'; // Locality
    String birthDate = _selectedDate != null
        ? '${_selectedDate!.year}-${_selectedDate!.month}-${_selectedDate!.day}' // Birthday date
        : '';

    CloudSync.registerUserDetails(
      context,
      FirebaseAuth.instance.currentUser!.uid,
      username,
      name,
      surname,
      idNumber,
      homeAddress,
      phone,
      Referral,
      locality,
      gender,
      birthDate,
    );
  }
}

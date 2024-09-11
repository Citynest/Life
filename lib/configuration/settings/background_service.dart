import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class MyBackgroundService extends StatefulWidget {
  const MyBackgroundService({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _MyBackgroundServiceState createState() => _MyBackgroundServiceState();
}

class _MyBackgroundServiceState extends State<MyBackgroundService> {
  static const MethodChannel _channel =
      MethodChannel('flutter_background_service');

  late String _notificationTitle;
  late String _notificationContent;

  @override
  void initState() {
    super.initState();
    _notificationTitle = "Background Service";
    _notificationContent = "Service is running in the background";

    _initPlatformState();
    _startBackgroundService();
  }

  Future<void> _initPlatformState() async {
    try {
      _channel.setMethodCallHandler(_handleMethod);
    } on PlatformException {
      print("Error initializing platform state.");
    }
  }

  Future<void> _startBackgroundService() async {
    try {
      await _channel.invokeMethod('startService', {
        'title': _notificationTitle,
        'content': _notificationContent,
      });
    } on PlatformException {
      print("Error starting background service.");
    }
  }

  Future<dynamic> _handleMethod(MethodCall call) async {
    switch (call.method) {
      case 'onData':
        // Handle data from the background
        print("Received data from background service: ${call.arguments}");
        break;
      default:
        print("Unknown method: ${call.method}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Background Service Example'),
      ),
      body: const Center(
        child: Text('This is your main app UI'),
      ),
    );
  }
}

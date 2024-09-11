import 'package:flutter/material.dart';
import 'package:ice/configuration/settings/disndat.dart';
import 'about_page.dart';

class GodlyTouch extends StatefulWidget {
  const GodlyTouch({super.key});

  @override
  _GodlyTouchState createState() => _GodlyTouchState();
}

class _GodlyTouchState extends State<GodlyTouch> {
  final PageController _pageController = PageController(initialPage: 0);

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _navigateToPage(int page) {
    _pageController.jumpToPage(page);
    Navigator.pop(context); // Close the drawer
  }

  @override
  Widget build(BuildContext context) {
    bool shouldShowSettingsButton = MediaQuery.of(context).size.width > 600;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black, // Set app bar color to black

        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        //** */

        // title: const Row(
        //      children: [
        //      Icon(Icons.account_balance_wallet, color: Colors.white),
        //  ],
        //   ),
      ),
      drawer: GestureDetector(
        behavior: HitTestBehavior.opaque,
        child: Drawer(
          child: Container(
            color: Colors.purple,
            padding: const EdgeInsets.symmetric(vertical: 40),
            child: Column(
              children: [
                ListTile(
                  leading:
                      const Icon(Icons.star_border_sharp, color: Colors.white),
                  title: const Text(
                    'Welcome',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    _navigateToPage(0);
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.question_mark_outlined,
                      color: Colors.white),
                  title: const Text(
                    'FAQ & licensing',
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    _navigateToPage(1);
                  },
                ),
                if (shouldShowSettingsButton)
                  ListTile(
                    leading: const Icon(Icons.settings_suggest_outlined,
                        color: Colors.white),
                    title: const Text(
                      'Settings',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () {
                      _navigateToPage(2);
                    },
                  ),
                Expanded(child: Container()),
              ],
            ),
          ),
        ),
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          // Handle page change if needed
        },
        children: [
          const disndat(),
          const AboutPage(),
          Container(
            padding: const EdgeInsets.all(16),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Anonymous settings
                Text(
                  'Settings',
                  style: TextStyle(color: Colors.white),
                ),
              ],
            ),
          ),

          // You can add a list tile here for slide scrolling effect.
        ],
      ),
    );
  }
}

// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class space extends StatelessWidget {
  const space({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Services & Products',
            style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.black,
        automaticallyImplyLeading: false, // Remove the back button
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          // Merged XP and Fame Meters
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
            child: Column(
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    LinearProgressIndicator(
                      value: 0.0,
                      backgroundColor: Colors.grey,
                      color: Colors.yellow,
                      minHeight: 10,
                    ),
                    // This XP meter represents Experience with knowing this app, the more XP users gain the more features they are allowed to use in early & subsidized stages
                    // XP meter allows unique situations tailored to users allowing skilled personal gain recognition at heavy subsized costs at times (getting stuff for free)
                    // The XP meter also gauges trust level of users, low XP means the user is not using the app and should not be trusted
                    // XP is tiered into 5 stages of the infinity stones (Power, Soul, Mind, Time & Space)
                    // All user start on the Power stone fighting for Power
                    // Users who show exeptional skill will gain XP and unlock a stone unique to them for higher rewards
                    Text('XP', style: TextStyle(color: Colors.lightBlue)),
                  ],
                ),
                Divider(
                  color: Colors.grey, // Thin line separator
                  thickness: 1,
                  height: 0, // No space between the meters
                ),
                // This Respect meter represents the dignity of a user. the meter is heavily reliant on the XP meter & achievements for it to fill up
                // The Respect meter determinds the user's readiness to unlock another infinity stone
                // It also handles rewards of all tiers thus ensuring your respect is equavalent to your skillset & value to the community.
                Stack(
                  alignment: Alignment.center,
                  children: [
                    LinearProgressIndicator(
                      value: 0.0,
                      backgroundColor: Colors.grey,
                      color: Colors.blue,
                      minHeight: 10,
                    ),
                    Text('Respect', style: TextStyle(color: Colors.lightBlue)),
                  ],
                ),
              ],
            ),
          ),
          // Service & Product List
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: 8, // Adjust this count based on your list
                itemBuilder: (context, index) {
                  return GestureDetector(
                    onTap: () {
                      // Navigate to service/product detail page
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => DetailPage(index: index)),
                      );
                    },
                    child: Container(
                      // 1st box used for advertisement refreshes every 6hrs (P1 extra for shorter refresh time, P700 per 4hrs of advertisement unless a higher offer surfaces)
                      // 10% of gained revenue goes into the app's inapp point system/ currency (P1 == 1pts & P100 == 100pts)
                      // 5 % goes to App costs "Real life expenses eg: loans (if any), debt (if any)"
                      // Exploring the golden box gives users free XP of 0.3 per 15mins
                      // Create a bidding system for the golden box minimum = P700per 4hrs
                      // Any user who uses (advertises) the golden box gains XP of 200 per hour
                      // Golden box offers various inhouse apps & services with exeptions.
                      decoration: BoxDecoration(
                        color: index == 0 ? Colors.amber : Colors.blueGrey,
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: index == 0
                            ? [
                                BoxShadow(
                                  color: Colors.amber.withOpacity(0.5),
                                  spreadRadius: 3,
                                  blurRadius: 7,
                                  offset: Offset(0, 3),
                                )
                              ]
                            : [],
                      ),
                      child: Center(
                        child: Text(
                          'Item ${index + 1}',
                          style: const TextStyle(
                            color: Colors.lightBlue,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          // const SizedBox(height: 16),
          // Center(
          //  child: ElevatedButton(
          //    onPressed: () {
          //      // Implement "Exploration" functionality here
          //    },
          //    child: const Text('Begin Exploring',
          //       style: TextStyle(color: Colors.lightBlue)),
          //  ),
          // ),
        ],
      ),
    );
  }
}

class DetailPage extends StatelessWidget {
  final int index;

  const DetailPage({super.key, required this.index});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Detail Page - Item ${index + 1}',
            style: const TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: const IconThemeData(
            color: Colors.black), // Change back button color to black
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Item Description
            Text('Details about Item ${index + 1}',
                style: const TextStyle(fontSize: 20, color: Colors.lightBlue)),
            const SizedBox(height: 16),
            // Booking Button
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Implement booking functionality here
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Book Service',
                          style: TextStyle(color: Colors.lightBlue)),
                      content: const Text('Service booked successfully!',
                          style: TextStyle(color: Colors.lightBlue)),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const Text('OK',
                              style: TextStyle(color: Colors.lightBlue)),
                        ),
                      ],
                    ),
                  );
                },
                child: const Text('Book Now',
                    style: TextStyle(color: Colors.lightBlue)),
              ),
            ),
            const SizedBox(height: 16),
            // User Reviews
            Expanded(
              child: ListView.builder(
                itemCount: 5, // Adjust this count based on your review list
                itemBuilder: (context, reviewIndex) {
                  return ListTile(
                    leading: const Icon(Icons.person, color: Colors.lightBlue),
                    title: Text('User ${reviewIndex + 1}',
                        style: const TextStyle(color: Colors.lightBlue)),
                    subtitle: const Text('This is a review comment.',
                        style: TextStyle(color: Colors.lightBlue)),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

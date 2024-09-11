import 'package:flutter/material.dart';

class ConnectedServicesPage extends StatelessWidget {
  const ConnectedServicesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connected Services'),
        backgroundColor: Colors.black,
        automaticallyImplyLeading: true,
        iconTheme:
            const IconThemeData(color: Colors.white), // Set back button color
        titleTextStyle: const TextStyle(color: Colors.white, fontSize: 20),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              children: [
                _buildListTile(
                  context,
                  icon: Icons.sim_card,
                  title: 'Connect Mascom',
                  onTap: () {
                    // Implement Mascom connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.sim_card,
                  title: 'Connect Orange',
                  onTap: () {
                    // Implement Orange connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.sim_card,
                  title: 'Connect Bemobile',
                  onTap: () {
                    // Implement Bemobile connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.payment,
                  title: 'Connect PayPal',
                  onTap: () {
                    // Implement PayPal connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.account_circle,
                  title: 'Connect Facebook',
                  onTap: () {
                    // Implement Facebook connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.cloud,
                  title: 'Connect Google Drive',
                  onTap: () {
                    // Implement Google Drive connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.location_on,
                  title: 'Connect Google Maps',
                  onTap: () {
                    // Implement Google Maps connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.fitness_center,
                  title: 'Connect Health plug🔱',
                  onTap: () {
                    // Implement heal services connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.shopping_cart,
                  title: 'Connect Amazon',
                  onTap: () {
                    // Implement Amazon connection logic
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.message,
                  title: 'Connect WhatsApp',
                  onTap: () {
                    // Implement WhatsApp connection logic
                    // Auto messages, alerts, (calls & message initiation)
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.music_note,
                  title: 'Connect Spotify',
                  onTap: () {
                    // Implement Spotify connection logic
                    // Stream & download from my app using spotify subscription
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.business,
                  title: 'Connect LinkedIn',
                  onTap: () {
                    // LinkedIn connection logic reflects on profile information under "extras & workplaces"
                  },
                ),
                // New services added below
                _buildListTile(
                  context,
                  icon: Icons.store,
                  title: 'Connect Choppies',
                  onTap: () {
                    // Implement Choppies connection logic
                    // Ordering food & making it get delivered
                    // Maps services needed here
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.local_shipping,
                  title: 'Connect Courier Services',
                  onTap: () {
                    // Implement Courier Services connection logic
                    // Dafault option fordelivering food & services delivery methods
                    // Maps services needed here
                    // 3rd party influence heavy here (money maker)
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.restaurant,
                  title: 'Connect Restaurants',
                  onTap: () {
                    // Implement Restaurants connection logic
                    // locating local haapenings & diners
                  },
                ),
                _buildListTile(
                  context,
                  icon: Icons.shopping_bag,
                  title: 'Connect Spar',
                  onTap: () {
                    // Implement Spar connection logic
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildListTile(BuildContext context,
      {required IconData icon,
      required String title,
      required VoidCallback onTap}) {
    return ListTile(
      leading: Icon(icon, color: Colors.white), // Change icon color to white
      title: Text(
        title,
        style: const TextStyle(
          color: Colors.white, // Change text color to white
          fontWeight: FontWeight.bold, // Make the text bold
        ),
      ),
      trailing: const Icon(Icons.arrow_forward,
          color: Colors.white), // Change trailing icon color to white
      onTap: onTap,
    );
  }
}

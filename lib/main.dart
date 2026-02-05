import 'package:flutter/material.dart';

void main() {
  runApp(const StockMcdoApp());
}

class Produit {
  String nom;
  int quantite;
  Produit({required this.nom, this.quantite = 0});
}

class StockMcdoApp extends StatelessWidget {
  const StockMcdoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stock McDo',
      theme: ThemeData(
        primarySwatch: Colors.red,
        useMaterial3: true,
      ),
      home: const StockPage(),
    );
  }
}

class StockPage extends StatefulWidget {
  const StockPage({super.key});

  @override
  State<StockPage> createState() => _StockPageState();
}

class _StockPageState extends State<StockPage> {
  // Liste des produits:
  final List<Produit> produits = [
    Produit(nom: 'Big Mac'),
    Produit(nom: 'McChicken'),
    Produit(nom: 'Royal Deluxe'),
    Produit(nom: 'Frites M'),
    Produit(nom: 'Frites L'),
    Produit(nom: 'Nuggets 4'),
    Produit(nom: 'Nuggets 9'),
    Produit(nom: 'Nuggets 20'),
    Produit(nom: 'Coca-Cola M'),
    Produit(nom: 'Coca-Cola L'),
    Produit(nom: 'Sprite M'),
    Produit(nom: 'Fanta M'),
    Produit(nom: 'McFlurry Oreo'),
    Produit(nom: 'Sundae Caramel'),
    Produit(nom: 'Crousty Poulet'),
    Produit(nom: 'P\'tit Wrap Ranch'),
  ];

  void incrementer(int index) {
    setState(() {
      produits[index].quantite++;
    });
  }

  void decrementer(int index) {
    setState(() {
      if (produits[index].quantite > 0) {
        produits[index].quantite--;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stocks McDo'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: ListView.builder(
        itemCount: produits.length,
        itemBuilder: (context, index) {
          final p = produits[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            child: ListTile(
              title: Text(
                p.nom,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: const Icon(Icons.remove_circle_outline),
                    color: Colors.red,
                    iconSize: 32,
                    onPressed: () => decrementer(index),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      p.quantite.toString(),
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.add_circle_outline),
                    color: Colors.green,
                    iconSize: 32,
                    onPressed: () => incrementer(index),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

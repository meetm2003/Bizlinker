import 'package:flutter/material.dart';
import 'package:multi_dropdown/multi_dropdown.dart';

class CustomSelector extends StatefulWidget {
  final String type; // 'selector' or 'multipleSelector'
  final TextEditingController controller;
  final String hintText;
  final List<String> options;

  const CustomSelector({
    super.key,
    required this.type,
    required this.controller,
    required this.hintText,
    required this.options,
  });

  @override
  State<CustomSelector> createState() => _CustomSelectorState();
}

class _CustomSelectorState extends State<CustomSelector> {
  final MultiSelectController<String> _controller =
      MultiSelectController<String>();

  @override
  void initState() {
    super.initState();

    // Initialize dropdown items for the controller
    _controller.setItems(widget.options
        .map((option) => DropdownItem<String>(value: option, label: option))
        .toList());
  }

  void _selectSingleValue(String value) {
    setState(() {
      widget.controller.text = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        widget.type == "selector"
            ? DropdownButtonFormField<String>(
                value: widget.controller.text.isEmpty
                    ? null
                    : widget.controller.text,
                hint: Text(widget.hintText,
                    style: const TextStyle(color: Colors.white70)),
                items: widget.options.map((String option) {
                  return DropdownMenuItem(
                    value: option,
                    child: Text(option,
                        style: const TextStyle(color: Colors.white70)),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) _selectSingleValue(value);
                },
                decoration: InputDecoration(
                  contentPadding:
                      const EdgeInsets.symmetric(vertical: 17, horizontal: 20),
                  filled: true,
                  fillColor: const Color.fromARGB(255, 37, 44, 50),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide.none,
                  ),
                ),
                dropdownColor: const Color.fromARGB(255, 37, 44, 50),
                icon: const Icon(Icons.arrow_drop_down, color: Colors.white70),
              )
            : MultiDropdown<String>(
                items: widget.options
                    .map((option) =>
                        DropdownItem<String>(value: option, label: option))
                    .toList(),
                controller: _controller,
                enabled: true,
                searchEnabled: true,
                chipDecoration: const ChipDecoration(
                  backgroundColor: Colors.blue,
                  wrap: true,
                  runSpacing: 2,
                  spacing: 10,
                ),
                fieldDecoration: FieldDecoration(
                  backgroundColor: const Color.fromARGB(255, 37, 44, 50),
                  padding: const EdgeInsets.symmetric(vertical: 17, horizontal: 20, ),
                  hintText: widget.hintText,
                  hintStyle: const TextStyle(color: Colors.white70),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide.none,
                  ),
                ),
                dropdownDecoration: const DropdownDecoration(
                  marginTop: 2,
                  maxHeight: 300,
                  header: Padding(
                    padding: EdgeInsets.all(8),
                    child: Text(
                      'Select items from the list',
                      textAlign: TextAlign.start,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                onSelectionChange: (selectedItems) {
                  widget.controller.text = selectedItems.join(", ");
                },
              ),
      ],
    );
  }
}

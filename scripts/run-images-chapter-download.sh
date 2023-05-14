#!/usr/bin/env bash
# Number of tabs to open
# Calculate the total number of records
total_records=26614
start_index=0
batch_size=500
# Calculate the number of batches
num_batches=$(( (total_records - start_index) / batch_size + 1 ))
# Command to execute in each tab
base_command="python3 ./python-scripts/downloadImages.py"

# Function to open a new terminal tab, change directory, and execute the command
open_tab() {
  osascript \
    -e 'tell application "Terminal"' \
    -e 'tell application "System Events" to keystroke "t" using {command down}' \
    -e "do script \"cd '$PWD'; $1\" in front window" \
    -e 'end tell' > /dev/null
}

echo "num_batches: $num_batches"

# Open the specified number of tabs and execute the command in each tab
for ((i=0; i<num_batches; i++))
do
  # Open a new terminal tab, change directory to current folder, and execute the command
  current_start=$(( start_index + (i * batch_size) ))
  current_end=$(( current_start + batch_size - 1 ))
  # Adjust the end index to ensure it doesn't exceed the total number of records
  if (( current_end >= total_records )); then
    current_end=$(( total_records - 1 ))
  fi

  # Construct the command for the current batch
  current_command="${base_command} ${current_start} ${current_end}"
  echo "Current command: $current_command"
  open_tab "$current_command"
done

import sys
from sys import argv
import csv


def main():
    # get arguments and check correct usase
    if len(argv) != 3:
        sys.exit("Usage: python dna.py data.csv sequence.txt")

    # read csv file
    database = []
    with open(sys.argv[1], "r") as db_file:
        reader = csv.DictReader(db_file)
        for row in reader:
            database.append(row)

    # read sequence file
    with open(sys.argv[2], "r") as seq_file:
        sequence = seq_file.read()

    # find occurences of each STR in given sequence
    temp_list = []
    sequence_matches = {}

    # get list of STRS from the database header
    for key in database[0].keys():
        temp_list.append(str(key))

    # trim first index from the header
    str_list = temp_list[1:len(temp_list)]

    # use list to find sequence matches
    for i in str_list:
        sequence_matches[i] = str(find_str(str(sequence), i))

    # compare results with database and print result
    matches = 0

    for person in database:
        for i in str_list:
            if(person[i] == sequence_matches[i]):
                matches += 1
        # if person has all str matching, print result and stop
        if (matches == len(str_list)):
            print(person["name"])
            break
        else:
            matches = 0
    # handle no full matches
    if matches < len(str_list):
        print("No match")

# function to look up patterns


def find_str(string, pat):
    result = 0
    curr_occurence = 0
    last_found_match = 0
    for i in range(len(string)):

        # find first occurence of the pattern; if found, move coursor one length of a pattern forward
        if(string[i:i+len(pat)] == pat):
            curr_occurence += 1
            i += len(pat)
            # when pattern ends:
            if(string[i:i+len(pat)] != pat):
                # if curr consecutibe ocurences count > result, update; else: reset
                if(curr_occurence > result):
                    result = curr_occurence
                    curr_occurence = 0
                else:
                    curr_occurence = 0
    return result


if __name__ == "__main__":
    main()
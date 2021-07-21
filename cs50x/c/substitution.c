#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{
    //VALIDATE COMMAND LINE ARGS

    // for testing printf("argument count: %i\nstring2: %s\n", argc, argv[1]);
    // check no of arguments
    if (argc != 2)
    {
        printf("Usage: ./substitution key");
        return 1;
    }

    string input = argv[1];
    int sumInput = 0;

    // string to uppercase + count all values to check for uniqueness
    for (int i = 0; i < strlen(input); i++)
    {
        if (input[i] > 90)
        {
            input[i] -= 32;
        }
        sumInput += input[i];

    }

    // validate string
    if (sumInput != 2015)
    {
        printf("Key must contain 26 unique characters");
        return 1;
    }

    //MAIN FUNCTION

    //prompt for input:

    string plaintext = get_string("plaintext: ");

    //loop through text and apply cipher
    printf("ciphertext:");
    for (int j = 0; j < strlen(plaintext); j++)
    {
        if (plaintext[j] >= 65 && plaintext[j] <= 90)
        {
            printf("%c", input[plaintext[j] - 65]);
        }
        else if (plaintext[j] >= 97 && plaintext[j] <= 122)
        {
            printf("%c", (input[plaintext[j] - 97]) + 32);
        }
        else
        {
            printf("%c", plaintext[j]);
        }
    }
    printf("\n");


    //return cipher
    return 0;
}

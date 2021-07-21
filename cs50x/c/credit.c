#include <stdio.h>
#include <cs50.h>


int main(void)
{


    //ask for input 13-16 digits TODO: ALLOW OTHER NUMBERS, RETURN INVALID

    long input = get_long("Number: ");

    //CHECKSUM CALCULATOR
    //sum of every other number starting from second last
    //plus sum of leftover numbers should end with zero

    long inputCopy = input; // copy input for checksum calculations
    long inputXcard = input; //copy input to test card issuer

    int sum1 = 0;
    int sum2 = 0;
    int checksum = 0;
    int temp = 0;

    while (inputCopy > 0)
    {
        temp = inputCopy % 10;

        // get first number form right
        sum1 += temp;
        inputCopy /= 10;

        // get second number from right
        temp = (inputCopy % 10) * 2;

        if (temp < 10)
        {
            sum2 += temp;
        }
        else
        {
            sum2 += 1 + (temp  % 10);
        }
        inputCopy /= 10;
    }

    if (((sum1 + sum2) % 10) == 0)
    {
        checksum = 1;
    }

    //for testing only
    //int chksm = sum1 + sum2;
    //printf("checksum: %i\n", chksm);

    //ISSUE CHECK
    // check first numbers for issuer; 4x visa 51-55 mastercard, 34 or 37 amex
    // get first 2 digits of a number
    while (inputXcard >= 99)
    {
        inputXcard /= 10;
    }

    //VALIDATE NUMBER LENGTH 13-16 digits only
    int numberlength = 0;

    if (input < 1000000000000 || input > 5600000000000000)
    {
        numberlength = 0;
    }
    else
    {
        numberlength = 1;
    }

    // MAIN VALIDATOR
    if (checksum == 1 && numberlength == 1)
    {
        if (inputXcard < 56 && inputXcard > 50)
        {
            printf("MASTERCARD\n");
        }
        else if (inputXcard <= 49 && inputXcard >= 40)
        {
            printf("VISA\n");
        }
        else if (inputXcard == 37 || inputXcard == 34)
        {
            printf("AMEX\n");
        }
        else
        {
            printf("INVALID\n");
        }
    }
    else
    {
        printf("INVALID\n");
    }
};
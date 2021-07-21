#include <stdio.h>
#include <cs50.h>

int main(void)
{
// prompt fot input 1 to 8
    int input;
    do
    {
        input = get_int("Enter height between 1 and 8: ");
    }
    while (input < 1 || input > 8);

// draw pyramid -- for loop
    int hash = 1;
    int space = input - hash;


    //print rows
    for (int i = 0; i < input; i++)
    {
        //print space
        for (int j = 0; j < space; j++)
        {
            printf(" ");
        }
        //print hash
        for (int j = 0; j < hash; j++)
        {
            printf("#");
        }
        //print space between
        for (int k = 0; k < 2; k++)
        {
            printf(" ");
        }
        //print hash
        for (int l = 0; l < hash; l++)
        {
            printf("#");
        }

        // update values for next line
        printf("\n");
        hash++;
        space--;
    };

}

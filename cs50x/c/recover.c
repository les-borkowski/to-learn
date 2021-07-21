#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint8_t BYTE;

int main(int argc, char *argv[])
{
    // Check if input is correct
    if (argc != 2)
    {
        printf("Usage: ./recover image");
    }

    // set buffer 512B
    BYTE *buffer = calloc(512, sizeof(BYTE));

    // set memory for filenames
    char filename[8];

    // open file and check if empty
    FILE *input = fopen(argv[1], "r");

    if (input == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    // set filename count for jpg and count photos found
    int files_count = 0;

    //declare file pointer
    FILE *img = NULL;

    // read 512B into buffer until end of file
    while (fread(buffer, sizeof(BYTE), 512, input))
    {
        // look for jpg header
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            //open first jpeg file
            if (img == NULL)
            {
                sprintf(filename, "%03i.jpg", files_count);
                img = fopen(filename, "a");
                files_count++;
                fwrite(buffer, sizeof(BYTE), 512, img);
            }
            //if file already exists, close and start new one
            else
            {
                fclose(img);
                sprintf(filename, "%03i.jpg", files_count);
                img = fopen(filename, "a");
                files_count++;
                fwrite(buffer, sizeof(BYTE), 512, img);
            }
        }
        //if no jpg header found but file is open, append data to it
        else if (img != NULL)
        {
            fwrite(buffer, sizeof(BYTE), 512, img);
        }

    }

    //close files and free memory
    fclose(img);
    fclose(input);
    free(buffer);

    return 0;
}
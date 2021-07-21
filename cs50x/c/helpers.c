#include "helpers.h"
#include <math.h>
#include <stdlib.h>

int calc_gx(float a, float b);


// Convert image to grayscale -- DONE
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float colour_avg = (image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3.0;
            image[i][j].rgbtBlue = round(colour_avg);
            image[i][j].rgbtGreen = round(colour_avg);
            image[i][j].rgbtRed = round(colour_avg);
        }
    }
    return;
}

// Reflect image horizontally -- DONE
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE buffer[height][width];
    //save image to buffer
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            buffer[i][j] = image[i][j];
        }
    }
    // reverse the pixels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j] = buffer[i][width - 1 - j];
        }
    }

    return;
}

// Blur image  -- DONE
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE buffer[height][width];

    //save image to buffer
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            buffer[i][j] = image[i][j];
        }
    }

    //loop through every pixel
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // avg pixels around
            float blue_avg = 0;
            float green_avg = 0;
            float red_avg = 0;
            //count pixels used for avaraging near the edges
            float pixel_count = 0;

            for (int a = i - 1; a <= i + 1; a++)
            {
                for (int b = j - 1; b <= j + 1; b++)
                {
                    if ((a >= 0 && a < height)  && (b >= 0 && b < width))
                    {
                        blue_avg += buffer[a][b].rgbtBlue;
                        green_avg += buffer[a][b].rgbtGreen;
                        red_avg += buffer[a][b].rgbtRed;
                        pixel_count++;
                    }
                }
            }
            //update current pixel
            image[i][j].rgbtBlue = round(blue_avg / pixel_count);
            image[i][j].rgbtGreen = round(green_avg / pixel_count);
            image[i][j].rgbtRed = round(red_avg / pixel_count);
        }
    }
    return;
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    //save image to buffer
    RGBTRIPLE buffer[height][width];

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            buffer[i][j] = image[i][j];
        }
    }

    //Sobel algorithm values
    int array_X[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
    int array_Y[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

    //loop through the image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            //pixel calculations
            float gx_blue = 0;
            float gx_green = 0;
            float gx_red = 0;
            float gy_blue = 0;
            float gy_green = 0;
            float gy_red = 0;
            //step for Soble value arrays
            int step = 0;


            for (int a = i - 1; a <= i + 1; a++)
            {
                for (int b = j - 1; b <= j + 1; b++)
                {
                    if ((a >= 0 && a < height)  && (b >= 0 && b < width))
                    {
                        gx_blue += buffer[a][b].rgbtBlue * array_X[step];
                        gx_green += buffer[a][b].rgbtGreen * array_X[step];
                        gx_red += buffer[a][b].rgbtRed * array_X[step];

                        gy_blue += buffer[a][b].rgbtBlue * array_Y[step];
                        gy_green += buffer[a][b].rgbtGreen * array_Y[step];
                        gy_red += buffer[a][b].rgbtRed * array_Y[step];
                        step++;
                    }
                    else
                    {
                        step++;
                    }
                }
            }
            //calculate values and update pixel
            image[i][j].rgbtBlue = calc_gx(gx_blue, gy_blue);
            image[i][j].rgbtGreen = calc_gx(gx_green, gy_green);
            image[i][j].rgbtRed = calc_gx(gx_red, gy_red);
        }

    }
    return;
}

// calculate Sobel Value
int calc_gx(float a, float b)
{
    int result = round(sqrt(pow(a, 2) + pow(b, 2)));
    if (result > 255)
    {
        return 255;
    }
    else
    {
        return result;
    }
}
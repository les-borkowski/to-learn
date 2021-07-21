// Implements a dictionary's functionality

#include <stdbool.h>
#include <string.h>
#include <strings.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table
const unsigned int N = 512;

// Hash table
node *table[N];

// dictinoary size
int dict_size = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // done
    // switch word to lowercase to match hash function
    int n = strlen(word);
    char lc_word[n + 1];
    for (int i = 0; i < n; i++)
    {
        lc_word[i] = tolower(word[i]);
    }
    lc_word[n] = '\0';

    //hash word
    int index = hash(lc_word) % N;

    //access table and search
    struct node *entry = table[index];
    while (entry != NULL)
    {
        if (strcmp(entry->word, lc_word) == 0)
        {
            return true;
        }
        entry = entry->next;
    }
    return false;

}

// Hashes word to a number // DJB Hash function, by prof. D. J. Bernstein, from http://www.partow.net/programming/hashfunctions/index.html
unsigned int hash(const char *word)
{
    // done
    int length = strlen(word);

    unsigned int hash = 5381;
    unsigned int i    = 0;

    for (i = 0; i < length; ++word, ++i)
    {
        hash = ((hash << 5) + hash) + (*word);
    }

    return hash;

}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // not right - fixed
    //open file
    FILE *file = fopen(dictionary, "r");
    if (dictionary != NULL)
    {
        char buffer[LENGTH + 1];
        //scan words
        while (fscanf(file, "%s", buffer) != EOF)
        {
            //create new node and copy word into it.
            node *temp = malloc(sizeof(node));

            if (temp == NULL)
            {
                return false;
            }
            strcpy(temp->word, buffer);
            temp->next = NULL;

            //hash the word
            int index = hash(temp->word) % N;
            //insert node into hash table (table[hash]);

            if (table[index] == NULL)
            {
                table[index] = temp;
            }
            else
            {
                temp->next = table[index];
                table[index] = temp;
            }

            //count words for size function
            dict_size++;

        }
        fclose(file);
        return true;
        // free(buffer);

    }
    fclose(file);
    return false;


}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // done
    if (dict_size != 0)
    {
        return dict_size;
    }
    return 0;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // done
    //loop through the table
    for (int i = 0; i < N; i++)
    {
        struct node *entry = table[i];
        struct node *temp = entry;

        while (entry != NULL)
        {
            temp = entry;
            entry = entry->next;
            free(temp);
        }
    }
    return true;
}

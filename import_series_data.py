from pymongo import MongoClient
from pprint import pprint

# MongoDB connection string
MONGODB_URI = 'mongodb+srv://root:root@books-store-mern.86acyiy.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Books-Store-MERN'

# New data to be added
new_series_data = [
    {
        "title": "The Parables of The Quran",
        "speaker": "Yasir Qadhi",
        "views": "Unknown",
        "episodes": "29 Lectures",
        "category": "General Quran Tafsir",
        "subCategory": "Quran Parables",
        "thumbnail": "parablesQuran",
        "link": "https://www.youtube.com/playlist?list=PLYZxc42QNctUIsBRE5XCY6eICwl_W8jnj"
    },
    {
        "title": "Wisdoms of The Quran - Ramadan Series 2024",
        "speaker": "Yasir Qadhi",
        "views": "Unknown",
        "episodes": "26 Lectures",
        "category": "General Quran Tafsir",
        "subCategory": "Ramadan Series",
        "thumbnail": "wisdomsQuran",
        "link": "https://www.youtube.com/playlist?list=PLYZxc42QNctV2v3RRYwTHdgDHp_h80mJT"
    },
    {
        "title": "Life of Prophet Muhammad (S)",
        "speaker": "Uthman Ibn Farooq",
        "views": "Unknown",
        "episodes": "35 Lectures",
        "category": "Life of Prophet Muhammad",
        "subCategory": "Seerah",
        "thumbnail": "seerahUthman",
        "link": "https://www.youtube.com/playlist?list=PLlXVKBG9es9UamBMS7aubQSGe8u9RYGOk"
    },
    {
        "title": "Ramadan 2012 - Life of Muhammad - PBUH",
        "speaker": "Mufti Menk",
        "views": "Unknown",
        "episodes": "29 Lectures",
        "category": "Life of Prophet Muhammad",
        "subCategory": "Ramadan Series",
        "thumbnail": "seerahMufti",
        "link": "https://www.youtube.com/playlist?list=PL91FA0E3B7837B214"
    }
]

def add_missing_series():
    # Connect to MongoDB
    client = MongoClient(MONGODB_URI)
    
    # Select the database and collection
    db = client['books-collection']
    collection = db['series']
    
    # For each new series, check if it exists and add if it doesn't
    for series in new_series_data:
        existing_series = collection.find_one({"title": series["title"]})
        if not existing_series:
            result = collection.insert_one(series)
            print(f"Inserted series: {series['title']} with ID: {result.inserted_id}")
        else:
            print(f"Series already exists: {series['title']}")
    
    # Close the connection
    client.close()

if __name__ == "__main__":
    add_missing_series()
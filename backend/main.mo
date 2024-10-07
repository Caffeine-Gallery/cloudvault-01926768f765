import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor FileStorage {
  // Define a type for storing file information
  type File = {
    name: Text;
    content: Blob;
    contentType: Text;
  };

  // Use a stable variable to store files
  stable var fileEntries : [(Text, File)] = [];
  var files = HashMap.HashMap<Text, File>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  files := HashMap.fromIter<Text, File>(fileEntries.vals(), 10, Text.equal, Text.hash);

  // Function to upload a file
  public func uploadFile(name: Text, content: Blob, contentType: Text) : async () {
    let file : File = {
      name = name;
      content = content;
      contentType = contentType;
    };
    files.put(name, file);
    Debug.print("File uploaded: " # name);
  };

  // Function to retrieve a file
  public query func getFile(name: Text) : async ?File {
    files.get(name)
  };

  // Function to list all files
  public query func listFiles() : async [Text] {
    Iter.toArray(files.keys())
  };

  // Pre-upgrade hook to save the state
  system func preupgrade() {
    fileEntries := Iter.toArray(files.entries());
  };

  // Post-upgrade hook to restore the state
  system func postupgrade() {
    files := HashMap.fromIter<Text, File>(fileEntries.vals(), 10, Text.equal, Text.hash);
  };
}

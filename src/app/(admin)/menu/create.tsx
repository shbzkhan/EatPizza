import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../constants/Colors";
import Button from "../../../components/button";
import { defaultPizaaImage } from "../../../components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";
import Loader from "@/src/components/Loader";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";

const CreatePorductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!id;
  const router = useRouter();

  const { mutate: insetProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: updatingProduct } = useProduct(id);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name),
        setImage(updatingProduct.image),
        setPrice(updatingProduct.price.toString());
    }
  }, [updatingProduct]);

  const onSubmit = () => {
    setloading(true); 
    if (isUpdating) {
      onUpdateProduct();
    } else {
      onCreateProduct();
    }
  };

  const resetFiled = () => {
    setName("");
    setPrice("");
  };

  const onCreateProduct = async () => {
    if (!validationInput()) {
      setloading(false)
      return;

    }

    const imagePath = await uploadImage();

    // console.warn(`Name: ${name}, Price: ${price}`)
    insetProduct(
      { name, image: imagePath, price: parseFloat(price) },
      {
        onSuccess: () => {
          resetFiled();
          router.back();
          setloading(false);
        },
      }
    );
  };

  const onUpdateProduct = () => {
    if (!validationInput()) {
      setloading(false)
      return;
    }
    updateProduct(
      { id, name, image, price: parseFloat(price) },
      {
        onSuccess: () => {
          resetFiled(), router.back(), setloading(false);
        },
      }
    );
    // console.warn(name)
  };

  const validationInput = () => {
    setError("");
    if (!name) {
      setError("Name field is requried");
      return false;
    }
    if (!price) {
      setError("Price field is requried");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFiled();
        router.replace("/(admin)");
      },
    });
  };

  const onConfirmDelete = () => {
    Alert.alert("Confirm", "Are you sure to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <Image
        source={{ uri: image || defaultPizaaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select imgae
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="name"
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="99.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        onPress={onSubmit}
        text={
          loading ? (
            <ActivityIndicator color={"white"} />
          ) : isUpdating ? (
            "Update Product"
          ) : (
            "Create Product"
          )
        }
      />

      {isUpdating && (
        <Text onPress={onConfirmDelete} style={styles.textButton}>
          Delete Product
        </Text>
      )}
    </View>
  );
};

export default CreatePorductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

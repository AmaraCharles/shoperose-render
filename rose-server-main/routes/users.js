var express = require("express");
const UsersDatabase = require("../models/User");
const { hashPassword,sendOrderConfirmationToClient,sendOrderCompletionToClient } = require("../utils");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const users = await UsersDatabase.find();

  res.status(200).json({ code: "Ok", data: users });
});

/* GET users listing. */
router.get("/:email", async function (req, res, next) {
  const { email } = req.params;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.status(200).json({ code: "Ok", data: user });
});
/*get packages*/
router.get("/package/:id", async function (req, res, next) {
  const { id } = req.params;

  const user = await UsersDatabase.findOne({ _id: id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.status(200).json({ code: "Ok", data: user });
});



router.get("/art/:_id/:transactionId", async function (req, res, next) {
  const { _id, transactionId } = req.params;

  try {
    const user = await UsersDatabase.findOne({ _id: _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let item = user.collections.find(col => col._id=== transactionId);

    if (!item) {
      item = user.artWorks.find(art => art._id === transactionId);
      if (!item) {
        return res.status(404).json({ message: "Collection or Artwork not found" });
      }
    }
    
    return res.status(200).json({ code: "Ok", data: item });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});
router.put("/art/:_id/:transactionId", async function (req, res, next) {
  const { _id, transactionId } = req.params;
  const updateData = req.body; // Assuming update data is sent in the request body

  try {
    const user = await UsersDatabase.findOne({ _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item to update is in collections
    const collectionToUpdate = user.collections.find(col => col._id === transactionId);
    const artworkToUpdate = user.artWorks.find(art => art._id === transactionId);

    if (!collectionToUpdate && !artworkToUpdate) {
      return res.status(404).json({ message: "Collection or Artwork not found" });
    }

    // Determine the update path based on whether it is in collections or artWorks
    const updatePath = collectionToUpdate ? "collections" : "artWorks";
    
    const updateResult = await UsersDatabase.updateOne(
      { _id, [`${updatePath}._id`]: transactionId },
      { $set: { [`${updatePath}.$`]: { ...updateData, _id: transactionId } } }
    );

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "No changes made" });
    }

    return res.status(200).json({ code: "Ok", message: "Update successful" });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


router.delete("/:email/delete", async function (req, res, next) {
  const { email } = req.params;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  user.deleteOne();

  res.status(200).json({ code: "Ok" });
});

router.put("/:_id/profile/update", async function (req, res, next) {
  const { _id } = req.params;
  try {
    // Find the user by ID
    const user = await UsersDatabase.findOne({ _id });
   
    const email=user.email
    const firstName=user.firstName
    const lastName=user.lastName
    const item=user.item
    const address=user.address
    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with the new data from request body
    await user.update({
      ...req.body,
    });

    // Destructure fields from req.body (if they are updated via request)
   

    console.log(address);
    
    // Send order confirmation to the client using the relevant details
    sendOrderConfirmationToClient({ firstName, lastName, address, item, email });

    // Respond with success
    return res.status(200).json({
      message: "Update was successful",
    });
    
  } catch (error) {
    // Log and return the error if something goes wrong
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during the update",
      error: error.message,
    });
  }
});

router.put("/:_id/profile/complete", async function (req, res, next) {
  const { _id } = req.params;
  try {
    // Find the user by ID
    const user = await UsersDatabase.findOne({ _id });
const address=user.address
const item=user.item
const firstName=user.firstName
const lastName=user.lastName
const email=user.email
    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with the new data from request body
    await user.update({
      ...req.body,
    });

    // Destructure fields from req.body (if they are updated via request)
   

    console.log(address);
    
    // Send order confirmation to the client using the relevant details
    sendOrderCompletionToClient({ firstName, lastName, address, item, email });

    // Respond with success
    return res.status(200).json({
      message: "Order  completed successfully",
    });
    
  } catch (error) {
    // Log and return the error if something goes wrong
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during the update",
      error: error.message,
    });
  }
});
// GET route to retrieve specific collection or artwork by email and _id
// router.get("/art/:email/:_id", async function (req, res, next) {
//   const { _id, email } = req.params;

//   try {
//     // Find the user by email
//     const user = await UsersDatabase.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Try finding the item in collections or artworks
//     let item = user.collections.find(col => col._id.toString() === _id);

//     if (!item) {
//       item = user.artWorks.find(art => art._id.toString() === _id);
//       if (!item) {
//         return res.status(404).json({ message: "Collection or Artwork not found" });
//       }
//     }
    
//     return res.status(200).json({ code: "Ok", data: item });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: "An error occurred", error });
//   }
// });

router.get("/art/:_id/:transactionId", async function (req, res, next) {
  const { _id, transactionId } = req.params;

  try {
    const user = await UsersDatabase.findOne({ _id: _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let item = user.collections.find(col => col._id=== transactionId);

    if (!item) {
      item = user.artWorks.find(art => art._id === transactionId);
      if (!item) {
        return res.status(404).json({ message: "Collection or Artwork not found" });
      }
    }
    
    return res.status(200).json({ code: "Ok", data: item });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});


// PUT route to update specific collection or artwork by email and _id
router.get("/art/:_id/:transactionId", async function (req, res, next) {
  const { _id, transactionId } = req.params;

  try {
    const user = await UsersDatabase.findOne({ _id: _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let item = user.collections.find(col => col._id=== transactionId);

    if (!item) {
      item = user.artWorks.find(art => art._id === transactionId);
      if (!item) {
        return res.status(404).json({ message: "Collection or Artwork not found" });
      }
    }
    
    return res.status(200).json({ code: "Ok", data: item });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});
router.put("/art/:_id/:transactionId", async function (req, res, next) {
  const { _id, transactionId } = req.params;
  const updateData = req.body; // Assuming update data is sent in the request body

  try {
    const user = await UsersDatabase.findOne({ _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item to update is in collections
    const collectionToUpdate = user.collections.find(col => col._id === transactionId);
    const artworkToUpdate = user.artWorks.find(art => art._id === transactionId);

    if (!collectionToUpdate && !artworkToUpdate) {
      return res.status(404).json({ message: "Collection or Artwork not found" });
    }

    // Determine the update path based on whether it is in collections or artWorks
    const updatePath = collectionToUpdate ? "collections" : "artWorks";
    
    const updateResult = await UsersDatabase.updateOne(
      { _id, [`${updatePath}._id`]: transactionId },
      { $set: { [`${updatePath}.$`]: { ...updateData, _id: transactionId } } }
    );

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "No changes made" });
    }

    return res.status(200).json({ code: "Ok", message: "Update successful" });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


// router.put("/:_id/profile/complete", async function (req, res, next) {
//   const { _id } = req.params;

//   const user = await UsersDatabase.findOne({ _id: _id });

//   if (!user) {
//     res.status(404).json({ message: "user not found" });
//     return;
//   }

//   try {
//     await user.update({
//       ...req.body,
//     });
//     sendOrderCompletionToClient({firstName,lastName,address,item,email})
//     return res.status(200).json({
//       message: "update was successful",
      
//     });
    
//   } catch (error) {
//     console.log(error);
//   }
// });


router.put("/:_id/accounts/update", async function (req, res, next) {
  const { _id } = req.params;
  const accountDict = req.body;
  const data = accountDict.values;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  const cummulative = Object.assign({}, user.accounts, JSON.parse(data));

  console.log(cummulative);

  try {
    await user.updateOne({
      accounts: {
        ...cummulative,
      },
    });

    return res.status(200).json({
      message: "Account was updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:_id/accounts", async function (req, res, next) {
  const { _id } = req.params;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  return res.status(200).json({
    data: user.accounts,
    message: "update was successful",
  });
});

module.exports = router;

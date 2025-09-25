const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCopper = async (req, res) => {
  const { copper } = req.body;
  console.log('copper in create',copper)
  try {
    const copperTotal = await prisma.mastercopper.upsert({
      where: { id: 1 },
      update: {
        copperTotal: { increment: parseFloat(copper) },
      },
      create: {
        copperTotal: parseFloat(copper),
      },
    });

    return res
      .status(200)
      .json({ copperTotal: copperTotal, message: "Copper value Added" });
  } catch (err) {
    console.log(`Error on creating ${err.message}`);
    return res.status(500).json({ err: err.message });
  }
};

exports.updateCopper = async (req, res) => {
  const { id } = req.params;
  const { copper } = req.body;

  try {
    if(parseInt(id)!=1){
        return res.status(400).json({err:`we can't update the value for this id ${id} we can update value for id 1 `})
    }
    const updateCopper = await prisma.mastercopper.update({
      where: {
        id: parseInt(id),
      },
      data: {
        copperTotal:parseFloat(copper)
      },
    });
    return res
      .status(200)
      .json({ message: "Copper value Updated", updateCopper });
  } catch (err) {
    console.log("err", err.message);
    return res.status(500).json({ err: err.message });
  }
};

exports.getCopper=async(req,res)=>{
   try{
     const overAllCopper=await prisma.mastercopper.findMany()
     
     return res.status(200).json({copper:overAllCopper})
     
   }catch(err){
      console.log('err',err.message)
      return res.status(500).json({err:err.message})
   }
}

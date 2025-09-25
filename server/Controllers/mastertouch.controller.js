const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTouch = async (req, res) => {
  const { touch } = req.body;

  const parsedTouch = parseFloat(touch);
  
   if (isNaN(parsedTouch)) {
      return res.status(400).json({ error: "Invalid number" });
    }
    const ifExist=await prisma.masterTouch.findFirst({
      where:{
        touch:parsedTouch
        
      }
    })
    if(ifExist){
      return res.status(400).json({msg:"Touch Already Exist"})
    }

       const newTouch = await prisma.masterTouch.create({
      data: { touch: parsedTouch ,
        rawGoldStock:{
          create:{
            weight:0,
            remainingWt:0,
            touch:parsedTouch
          }
        }
        
      },
      
    });
      
    return res.status(201).json(newTouch);

    
    
    

  
};

const getTouch = async (req, res) => {
  try {
    const touches = await prisma.masterTouch.findMany();
    res.json(touches);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTouch =  async (req, res) => {
  const { id } = req.params;
  const { touch } = req.body;
 
  try {
   
    const updated = await prisma.masterTouch.update({
      where: { id: parseInt(id) },
      data: { touch: parseFloat(touch) },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Touch Already Exist" });
  }
}

const deleteTouch =  async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.masterTouch.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Touch value deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete touch value" });
  }
};
module.exports = {
  createTouch,
  getTouch,
  updateTouch,
  deleteTouch,
};

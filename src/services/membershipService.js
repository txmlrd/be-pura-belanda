const { Op } = require("sequelize");
const Membership = require("../models/membership.model");
const User = require("../models/user.model");
const userFamilyMember = require("../models/userFamilyMembers.model")

module.exports = {
  createMembership: async (userId, data) => {
    const primaryUser = await User.findByPk(userId);
    if (!primaryUser) throw new Error("Primary user not found");

    return await Membership.create({
      package_type: data.package_type,
      payment_proof: data.payment_proof || null,
      status: "pending",
      primary_user_id: userId,
    });
  },

  getMembershipByUserId: async (userId) => {
    return await Membership.findOne({
      where: {
        [Op.or]: [
          { primary_user_id: userId },
        ],
      }
    });
  },

  getAllMemberships : async () => {
    return await Membership.findAll();
  },

  updateMembership: async (membershipId, data) => {
    const membership = await Membership.findByPk(membershipId);
    if (!membership) return null;

    return await membership.update(data);
  },

  deleteMembership: async (membershipId) => {
    const membership = await Membership.findByPk(membershipId);
    if (!membership) return null;

    await membership.destroy();
    return true;
  },
};

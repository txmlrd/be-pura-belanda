const { Op } = require("sequelize");
const Membership = require("../models/membership.model");
const User = require("../models/user.model");

module.exports = {
  createMembership: async (data) => {
    const primaryUser = await User.findByPk(data.primary_user_id);
    if (!primaryUser) throw new Error("Primary user not found");

    if (data.secondary_user_id) {
      const secondaryUser = await User.findByPk(data.secondary_user_id);
      if (!secondaryUser) throw new Error("Secondary user not found");
    }

    return await Membership.create({
      package_type: data.package_type,
      payment_proof: data.payment_proof || null,
      status: "pending",
      primary_user_id: data.primary_user_id,
      secondary_user_id: data.secondary_user_id || null,
    });
  },

  getMembershipByUserId: async (userId) => {
    return await Membership.findOne({
      where: {
        [Op.or]: [
          { primary_user_id: userId },
          { secondary_user_id: userId },
        ],
      },
    });
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

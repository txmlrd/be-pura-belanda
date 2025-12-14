const membershipService = require("../services/membershipService");
const { error, success } = require("../helpers/response");

module.exports = {
  createMembership: async (req, res) => {
    try {
      const membership = await membershipService.createMembership(req.body);
      success(res, "Membership created successfully", membership, 201);
    } catch (error) {
      error(res, error.message, 400);
    }
  },

  getAllMemberships: async (req, res) => {
    try {
      const memberships = await membershipService.getAllMemberships();  
      success(res, "Memberships retrieved successfully", memberships, 200);
    } catch (error) {
      error(res, error.message, 400);
    }
  },

  getMembershipByUserId: async (req, res) => {
    try {
      const membership = await membershipService.getMembershipByUserId(req.params.userId);
      res.json(membership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateMembership: async (req, res) => {
    try {
      const updated = await membershipService.updateMembership(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Membership not found" });
      }

      res.json({
        message: "Membership updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteMembership: async (req, res) => {
    try {
      const deleted = await membershipService.deleteMembership(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Membership not found" });
      }

      res.json({ message: "Membership deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

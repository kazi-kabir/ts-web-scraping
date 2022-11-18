import { Schema } from "mongoose";
import { CompanyData } from "../types";

const mongoose = require("mongoose");

const companySchema = new Schema ({
    company: String,
    valuation: Number,
    industry: String,
    country: String,
    founders: String,
});

module.exports = mongoose.model('Company', companySchema);
#!/bin/bash
kubectl patch service finacplus-service -p '{"spec":{"selector":{"version":"blue"}}}'
echo "FinacPlus Rollback Completed!"

